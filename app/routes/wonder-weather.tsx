import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useNavigate,
  useSubmit,
  data,
  redirect,
  type MetaFunction,
} from 'react-router';
import type { ChangeEvent, FormEvent } from 'react';
import invariant from 'tiny-invariant';

import { getDemoUser, getUserRoleOptions, getUserTypeOptions, setDemoUserCookiesHeaders } from 'server/personas.server';
import { getWonderWeatherLocations, isWonderWeatherLocations } from 'server/weather.server';
import type { Route } from './+types/wonder-weather';
import { demoUserCookie } from 'server/cookies.server';
import { PersonaForm } from '~/components/PersonaForm';

export const meta: MetaFunction = () => [{ title: 'Wonder Weather' }];

export const loader = async ({ request }: Route.LoaderArgs) => {
  const requestUrl = new URL(request.url);
  const useDefault = requestUrl.searchParams.has('useDefault');
  const demoUser = await getDemoUser(request);

  const { wonders: wonderLocations } = await getWonderWeatherLocations({
    request,
    userData: demoUser as unknown as Record<string, unknown>,
    useDefault,
  });
  invariant(isWonderWeatherLocations(wonderLocations), 'No wonder locations found');

  const userTypeOptions = getUserTypeOptions();
  const userRoleOptions = await getUserRoleOptions(demoUser as unknown as Record<string, unknown>, request);
  return data(
    {
      wonderLocations,
      demoUser,
      userTypeOptions,
      userRoleOptions,
      useDefault,
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

export default function WonderWeather() {
  const { wonderLocations, demoUser, userTypeOptions, userRoleOptions, useDefault } = useLoaderData<typeof loader>();
  const submit = useSubmit();
  const navigate = useNavigate();

  const handleUserChange = (event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    submit(formData, { method: 'POST', preventScrollReset: true });
  };

  const toggleUsingCustomizations = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const isChecked = target.checked;
    if (!isChecked) {
      navigate({ search: 'useDefault' });
    } else {
      navigate({ search: '' });
    }
  };

  return (
    <section className="grid min-h-screen w-full grid-cols-12 gap-1 bg-white font-sans text-black/80 sm:gap-6 dark:bg-gray-900 dark:text-white">
      <section className="col-span-12 col-start-1">
        <div className="p-3">
          <PersonaForm
            demoUser={demoUser}
            userTypeOptions={userTypeOptions}
            userRoleOptions={userRoleOptions}
            handleUserChange={handleUserChange}
          />
          <div className="col-span-3 col-start-2">
            <input
              id="useDefault-checkbox"
              type="checkbox"
              name="useDefault"
              defaultChecked={!useDefault}
              onChange={toggleUsingCustomizations}
            />
            <span className="ml-2">{useDefault ? 'No customizations' : 'Using customizations'}</span>
          </div>
        </div>
      </section>
      <section className="col-span-12 col-start-1 sm:col-span-4">
        <h1 className="bold mb-4 mt-1 py-5 text-4xl">
          <Link to="/wonder-weather">{wonderLocations.title}</Link>
        </h1>
        <ul className="sticky top-2 rounded-md text-white/90">
          {wonderLocations.locations.map(location => (
            <li key={location.id} className="flex flex-col text-white">
              <NavLink
                to={`${location.id}`}
                prefetch="intent"
                preventScrollReset={true}
                className={({ isActive }) => (isActive ? 'opacity-100' : 'opacity-60 hover:opacity-90')}
              >
                <div className="relative">
                  <img className="h-24 w-full object-cover" src={location.image} alt={location.name} />
                  <p className="absolute bottom-1 left-2 text-lg font-semibold">{location.name}</p>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </section>

      <section className="col-span-12 sm:col-span-8 sm:col-start-5">
        <Outlet />
      </section>
    </section>
  );
}
