import { data, Link, redirect, useNavigate, useSubmit, type MetaFunction } from 'react-router';
import { PersonaForm } from '~/components/PersonaForm';
import type { Route } from './+types/dashboard-demo';
import {
  getDemoUser,
  getUserRoleOptions,
  getUserTypeOptions,
  setDemoUserCookiesHeaders,
} from '~/server/personas.server';
import { demoUserCookie } from '~/server/cookies.server';
import { useState, type FormEvent } from 'react';
import { getDashboardModules, getGreeting, getNavSections } from '~/server/dashboard-demo.server';
import { Icon, IconSize } from '~/components/Icon';
import { DashboardModule } from '~/components/dashboard-demo/Module';

export const meta = ({ data }: Route.MetaArgs) => [{ title: `${data.demoUser.firstName}'s dashboard` }];

export const loader = async ({ request }: Route.LoaderArgs) => {
  const demoUser = await getDemoUser(request);

  const [navSections, dashboardModulesList, greeting] = await Promise.all([
    getNavSections(demoUser as unknown as Record<string, unknown>, request),
    getDashboardModules(demoUser as unknown as Record<string, unknown>, request),
    getGreeting(demoUser as unknown as Record<string, unknown>, request),
  ]);

  const userTypeOptions = getUserTypeOptions();
  const userRoleOptions = await getUserRoleOptions(demoUser as unknown as Record<string, unknown>, request);
  return data(
    {
      demoUser,
      userTypeOptions,
      userRoleOptions,
      navSections,
      dashboardModulesList,
      greeting,
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
  return redirect(url.pathname, { headers });
};

export default function DashboardDemo({ loaderData }: Route.ComponentProps) {
  const { demoUser, userTypeOptions, userRoleOptions, navSections, dashboardModulesList, greeting } = loaderData;
  const submit = useSubmit();

  const [showPersonaForm, setShowPersonaForm] = useState<boolean>(false);

  const handleUserChange = (event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    submit(formData, { method: 'POST', preventScrollReset: true });
  };

  const togglePersonaForm = () => {
    setShowPersonaForm(!showPersonaForm);
  };

  return (
    <section className="min-h-screen w-full bg-white font-sans text-black/80 sm:gap-6 dark:bg-neutral-950 dark:text-neutral-400">
      <section>
        <nav className="w-52 fixed top-0 left-0 p-4 text-sm bottom-0 bg-neutral-100 dark:bg-neutral-900">
          <div className="mb-2 text-neutral-800 dark:text-neutral-100">
            <button className="cursor-pointer" type="button" onClick={() => togglePersonaForm()}>
              {demoUser.firstName} {demoUser.lastName}
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {navSections.map(section => (
              <div key={section.id}>
                {section.title ? <h3>{section.title}</h3> : null}
                <ul className="flex flex-col gap-1">
                  {section.links.map(link => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="flex flex-row items-center gap-2 py-1 hover:bg-neutral-800 hover:text-neutral-300 px-2 rounded-sm"
                      >
                        <Icon name={link.icon} size={IconSize.small} />
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>
      </section>
      <main className="ml-52 p-20 flex flex-col gap-8">
        <h2 className="text-4xl font-semibold text-neutral-800 dark:text-neutral-100 text-center">{greeting}</h2>
        {/* Persona picker */}
        {showPersonaForm ? (
          <section>
            <div className="p-3">
              <PersonaForm
                demoUser={demoUser}
                userTypeOptions={userTypeOptions}
                userRoleOptions={userRoleOptions}
                handleUserChange={handleUserChange}
              />
            </div>
          </section>
        ) : null}

        {dashboardModulesList.map(module => (
          <DashboardModule name={module} key={module} />
        ))}
      </main>
    </section>
  );
}
