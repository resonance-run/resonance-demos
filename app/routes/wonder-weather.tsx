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

import iosBadge from '~/components/images/ios-badge.svg';
import googlePlayBadge from '~/components/images/google-play-badge.png';
import {
  getDemoUser,
  getUserRoleOptions,
  getUserTypeOptions,
  setDemoUserCookiesHeaders,
} from '../server/personas.server';
import { getWonderWeatherLocations, isWonderWeatherLocations } from '../server/weather.server';
import type { Route } from './+types/wonder-weather';
import { demoUserCookie } from '../server/cookies.server';
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
        </div>
      </section>
      <section className="col-span-12 col-start-1 sm:col-span-4">
        <h1 className="bold mb-4 mt-1 py-5 text-4xl">
          <Link to="/wonder-weather">{wonderLocations.title}</Link>
        </h1>
        <ul className="sticky top-2 rounded-md text-white/90">
          {wonderLocations.locations.map(location => (
            <li key={location.id} className="flex flex-col text-white">
              <NavLink to={`${location.id}`} prefetch="intent" preventScrollReset={true}>
                <div className="relative flex items-center justify-end">
                  <img className="h-24 max-w-full min-w-1/2 object-cover" src={location.image} alt={location.name} />
                  <p className="absolute bottom-1 left-2 text-3xl font-semibold copy-drop-shadow-center">
                    {location.name}
                  </p>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </section>

      <section className="col-span-12 sm:col-span-8 sm:col-start-5">
        <Outlet />
      </section>
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
      <div className="col-start-1 sm:col-start-2 col-span-11 pb-8 gap-4 flex flex-col items-center">
        <p className="text-lg font-semibold">Check out this demo in our mobile app.</p>
        {demoUser.lastName ? (
          <p>
            Be sure to enter <span className="font-bold">{demoUser.lastName}</span> in the "Last name" field on the
            settings screen to see this customized experience.
          </p>
        ) : null}
        <div className="flex flex-row gap-8">
          <a href="https://apps.apple.com/us/app/wonder-weather-by-resonance/id6739744523">
            <img src={iosBadge} alt="Download on the App Store" className="h-14" />
          </a>
          <a href="https://play.google.com/store/apps/details?id=run.resonance.weather&pcampaignid=web_share">
            <img src={googlePlayBadge} alt="Get it on Google Play" className="h-14" />
          </a>
        </div>
      </div>
    </section>
  );
}
