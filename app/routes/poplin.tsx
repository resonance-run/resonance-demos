import { getDemoUser, getUserRoleOptions, getUserTypeOptions, setDemoUserCookiesHeaders } from 'server/personas.server';
import { data, NavLink, Outlet, redirect, useSubmit } from 'react-router';
import { Icon, IconName } from '~/components/Icon';
import { demoUserCookie } from 'server/cookies.server';
import { useState, type FormEvent } from 'react';
import { PersonaForm } from '~/components/PersonaForm';
import type { Route } from './+types/poplin';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Poplin Demo - Resonance' },
    { name: 'description', content: 'Customizations of the Poplin home screen' },
  ];
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const demoUser = await getDemoUser(request);
  const userTypeOptions = getUserTypeOptions();
  const userRoleOptions = await getUserRoleOptions(demoUser as unknown as Record<string, unknown>, request);
  const tabs = [
    { route: '/poplin/homescreen', name: 'Laundry', icon: IconName.layers },
    { route: '/poplin/orders', name: 'Orders', icon: IconName.truck },
    { route: '/poplin/account', name: 'Account', icon: IconName.user },
    {
      route: '/poplin/referrals',
      name: 'Referrals',
      icon: IconName.gift,
      isHighlighted: true,
    },
  ];
  return data(
    {
      tabs,
      demoUser,
      userTypeOptions,
      userRoleOptions,
    },
    {
      headers: {
        'Set-Cookie': await demoUserCookie.serialize(demoUser),
      },
    }
  );
};

export const action = async ({ request }: Route.ActionArgs) => {
  const headers = await setDemoUserCookiesHeaders(request);
  const url = new URL(request.url);
  return redirect(url.pathname + '/homescreen', { headers });
};

export default function PoplinDemo({ loaderData }: Route.ComponentProps) {
  const { tabs, demoUser, userTypeOptions, userRoleOptions } = loaderData;
  const [isPersonaPickerVisible, setIsPersonaPickerVisible] = useState<boolean>(false);
  const submit = useSubmit();

  const handleUserChange = (event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    submit(formData, { method: 'POST', preventScrollReset: true });
  };
  return (
    <main className="flex h-screen w-screen flex-col items-center bg-white text-black/80 dark:text-black/80">
      {isPersonaPickerVisible ? (
        <div className="w-full bg-white dark:bg-gray-900">
          <PersonaForm
            demoUser={demoUser}
            userTypeOptions={userTypeOptions}
            userRoleOptions={userRoleOptions}
            handleUserChange={handleUserChange}
          />
        </div>
      ) : null}
      <div className="relative flex w-full max-w-[440px] items-center justify-center py-12">
        <img src="https://app.poplin.co/assets/svgs/poplin-logo-pink.svg" alt="Poplin logo" />
        <button
          type="button"
          className="absolute right-4 flex h-10 w-10 items-center justify-center rounded-full border border-black p-2"
          onClick={() => setIsPersonaPickerVisible(!isPersonaPickerVisible)}
        >
          <span className="sr-only">Learn more</span>
          <p className="text-2xl">?</p>
        </button>
      </div>
      <Outlet />
      <nav className="fixed bottom-0 w-screen border-t border-t-gray-300 bg-white p-5">
        <ul className="mx-auto flex w-full max-w-[440px] flex-row items-center justify-around">
          {tabs.map(tab => (
            <li key={tab.route}>
              <NavLink to={tab.route} className={({ isActive }) => `group ${isActive ? 'is-active' : ''}`}>
                <div
                  className={`flex flex-col items-center justify-center gap-3 rounded-md px-3 pb-1 pt-0 font-light ${
                    tab.isHighlighted ? 'bg-[rgb(255,235,240)]' : ''
                  }`}
                >
                  <span className="rounded-full bg-transparent p-2 hover:bg-[rgb(255,156,181)] group-[.is-active]:bg-[rgb(255,98,137)] group-[.is-active]:text-white">
                    <Icon name={tab.icon} />
                  </span>
                  <span>{tab.name}</span>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
