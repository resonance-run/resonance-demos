import { Form, useNavigation } from 'react-router';
import { type FormEvent, type InputHTMLAttributes, useEffect, useState } from 'react';

import { Icon, IconName } from './Icon';
import type { DemoUser } from '../server/personas.server';
import { Button, ButtonEmphasis } from './form/Button';
import { Loading } from './Loading';

interface PersonaPickerProps {
  demoUser: DemoUser;
  userTypeOptions: string[];
  userRoleOptions?: [string, string][];
  handleUserChange: (event: FormEvent<HTMLFormElement>) => void;
}

export const PersonaForm = ({ demoUser, userTypeOptions, userRoleOptions, handleUserChange }: PersonaPickerProps) => {
  const navigation = useNavigation();
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(true);

  useEffect(() => {
    setIsSaving(navigation.state === 'submitting' || navigation.state === 'loading');
  }, [navigation.state]);
  return (
    <section
      className={`col-span-10 col-start-2 mb-8 mt-4 bg-gray-300 p-2 text-black/90 dark:bg-gray-700 dark:text-gray-200`}
    >
      <h3 className={`my-2 flex flex-row justify-between text-xl font-semibold text-black/80 dark:text-gray-200`}>
        <span>View as a persona</span>
        <Button type="button" emphasis={ButtonEmphasis.tertiary} onClick={() => setIsFormVisible(!isFormVisible)}>
          <span className="sr-only">{isFormVisible ? 'Hide demo users table' : 'Show demo users table'}</span>
          <Icon
            name={IconName.chevronRight}
            className={`text-black transition-transform dark:text-gray-200 ${isFormVisible ? 'rotate-90' : ''}`}
          />
        </Button>
      </h3>
      {isFormVisible ? (
        <Form onChange={handleUserChange} method="POST" className="mx-auto max-w-[400px]">
          <div className="flex flex-col gap-[1px]">
            <div className="gap-[1px] font-semibold">
              <div className="flex flex-row items-center justify-center gap-4 bg-white dark:bg-gray-900">
                <p className="col-span-1 bg-white p-1 text-center text-xl font-normal dark:bg-gray-900">
                  <span className={isSaving ? 'opacity-40' : ''}>Viewing as</span>
                </p>
                {isSaving ? <Loading /> : <Icon name={IconName.check} className="text-green-500" />}
              </div>
              <p className="col-span-1 bg-white p-1 dark:bg-gray-900">
                First name
                <DemoUserInput defaultValue={demoUser.firstName} name={`demoUser.firstName`} />
              </p>
              <p className="col-span-1 bg-white p-1 dark:bg-gray-900">
                Last name
                <DemoUserInput defaultValue={demoUser.lastName} name={`demoUser.lastName`} />
              </p>
              {userRoleOptions?.length ? (
                <p className="bg-white p-1 dark:bg-gray-900">
                  User role
                  <DemoSelect selectedValue={demoUser.userRole} options={userRoleOptions} name={`demoUser.userRole`} />
                </p>
              ) : null}
              <p className="col-span-2 bg-white p-1 dark:bg-gray-900">
                User type
                <DemoSelect selectedValue={demoUser.userType} options={userTypeOptions} name={`demoUser.userType`} />
              </p>
            </div>
          </div>
        </Form>
      ) : null}
    </section>
  );
};

const DemoUserInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className="flex w-full border border-gray-600 px-2 active:border-gray-300 dark:border-gray-500 dark:bg-gray-900"
      {...props}
    />
  );
};

const DemoSelect = ({
  name,
  options,
  selectedValue,
}: {
  name: string;
  options: string[] | [string, string][];
  selectedValue: string;
}) => {
  return (
    <select name={name} className="w-full border dark:border-gray-500 dark:bg-gray-900" defaultValue={selectedValue}>
      {options.map(option => {
        const isTuple = Array.isArray(option);
        const value = isTuple ? option[0] : option;
        const displayValue = isTuple ? option[1] : option;
        return (
          <option key={value} value={value}>
            {displayValue}
          </option>
        );
      })}
    </select>
  );
};
