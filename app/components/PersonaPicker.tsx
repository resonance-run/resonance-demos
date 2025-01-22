import { useState, type FormEvent, type InputHTMLAttributes } from 'react';
import { Form } from 'react-router';

import { Icon, IconName } from './Icon';
import type { DemoUser } from 'server/personas.server';

interface PersonaPickerProps {
  demoUsers: DemoUser[];
  demoUser: DemoUser;
  userTierOptions: string[];
  userTypeOptions: string[];
  handleUserChange: (event: FormEvent<HTMLFormElement>) => void;
}

export const PersonaPicker = ({
  demoUser,
  demoUsers,
  userTierOptions,
  userTypeOptions,
  handleUserChange,
}: PersonaPickerProps) => {
  const [isDemoUsersVisible, setIsDemoUsersVisible] = useState<boolean>(false);
  return (
    <section
      className={`col-span-10 col-start-2 mb-8 mt-4 ${
        isDemoUsersVisible ? 'bg-gray-300 text-black/90' : 'bg-transparent text-white'
      } p-2 text-black/90`}
    >
      <h3
        className={`my-2 flex flex-row ${
          isDemoUsersVisible ? 'justify-between' : 'justify-start'
        } text-xl font-semibold text-black/80 dark:text-white/90`}
      >
        <span>View as a persona</span>
        <button type="button" onClick={() => setIsDemoUsersVisible(!isDemoUsersVisible)}>
          <span className="sr-only">{isDemoUsersVisible ? 'Hide demo users table' : 'Show demo users table'}</span>
          {isDemoUsersVisible ? (
            <Icon name={IconName.chevronDown} className="text-black" />
          ) : (
            <Icon name={IconName.plus} className="text-black/80 dark:text-white" />
          )}
        </button>
      </h3>
      {isDemoUsersVisible ? (
        <Form onChange={handleUserChange} method="POST">
          <div className="flex flex-col gap-[1px]">
            <div className="grid grid-cols-11 gap-[1px] font-semibold">
              <p className="col-span-1 bg-white p-1 text-center font-normal">View as</p>
              <p className="col-span-2 bg-white p-1">Label</p>
              <p className="col-span-2 bg-white p-1">User tier</p>
              <p className="col-span-2 bg-white p-1">User type</p>
              <p className="col-span-2 bg-white p-1">First name</p>
              <p className="col-span-2 bg-white p-1">Last name</p>
            </div>
            {demoUsers
              ?.filter(u => Boolean(u))
              .map(user => {
                const isSelectedUser = demoUser && user.id === demoUser?.id;
                return (
                  <div key={user.id} className="grid grid-cols-11 gap-[1px]">
                    <input type="hidden" name={`demoUsers[${user.id}].id`} value={user.id} />
                    <p className="col-span-1 flex flex-row justify-end bg-white p-1">
                      <button
                        type="submit"
                        name="viewAs"
                        value={user.id}
                        className={`flex w-full flex-row justify-end ${
                          isSelectedUser ? 'text-gray-600' : 'text-white hover:text-gray-300'
                        }`}
                      >
                        <Icon name={IconName.arrowRight} />
                      </button>
                    </p>
                    <p className="col-span-2 bg-white p-1">
                      <DemoUserInput defaultValue={user.label} name={`demoUsers[${user.id}].label`} />
                    </p>
                    <p className="col-span-2 bg-white p-1">
                      <DemoSelect
                        selectedValue={user.userTier}
                        options={userTierOptions}
                        name={`demoUsers[${user.id}].userTier`}
                      />
                    </p>
                    <p className="col-span-2 bg-white p-1">
                      <DemoSelect
                        selectedValue={user.userType}
                        options={userTypeOptions}
                        name={`demoUsers[${user.id}].userType`}
                      />
                    </p>
                    <p className="col-span-2 bg-white p-1">
                      <DemoUserInput defaultValue={user.firstName} name={`demoUsers[${user.id}].firstName`} />
                    </p>
                    <p className="col-span-2 bg-white p-1">
                      <DemoUserInput defaultValue={user.lastName} name={`demoUsers[${user.id}].lastName`} />
                    </p>
                  </div>
                );
              })}
          </div>
        </Form>
      ) : null}
    </section>
  );
};

const DemoUserInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <input className="w-full border-none active:border-gray-300" {...props} />;
};

const DemoSelect = ({ name, options, selectedValue }: { name: string; options: string[]; selectedValue: string }) => {
  return (
    <select name={name} className="w-full">
      {selectedValue}
      {options.map(option => (
        <option key={option} value={option} selected={option === selectedValue}>
          {option}
        </option>
      ))}
    </select>
  );
};
