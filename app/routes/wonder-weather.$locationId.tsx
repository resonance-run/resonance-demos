import { data, useFetcher, useLoaderData, type MetaFunction } from 'react-router';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

import { demoUserCookie } from '~/server/cookies.server';
import { getDemoUser } from '~/server/personas.server';
import { getWonderScreenData, type HourlyWeatherData } from '~/server/weather.server';
import type { Route } from './+types/wonder-weather.$locationId';

export const meta = ({ data }: Route.MetaArgs) => [
  {
    title: `Wonder Weather${data?.location ? ` | ${data.location.name}` : ''}`,
  },
];

const themeMap: Record<string, string> = {
  resBlue: 'res-blue',
  themePink: 'fuchsia',
  themeSlate: 'slate',
  themeYellow: 'yellow',
  themeEmerald: 'emerald',
};

export const loader = async ({ request, params }: Route.LoaderArgs) => {
  const requestUrl = new URL(request.url);
  const useDefault = requestUrl.searchParams.has('useDefault');
  const demoUser = await getDemoUser(request);

  const userData = demoUser as unknown as Record<string, unknown>;
  if (!params.locationId) {
    throw new Response(null, {
      status: 404,
      statusText: 'Location not found',
    });
  }
  const { wonder, weatherData, wonderTheme } = await getWonderScreenData({
    request,
    userData,
    locationId: params.locationId,
    useDefault,
  });
  const theme = themeMap[wonderTheme.colorTheme] ?? 'res-blue';

  return data(
    {
      location: wonder,
      weather: weatherData,
      theme,
    },
    {
      headers: {
        'Set-Cookie': await demoUserCookie.serialize(demoUser),
      },
    }
  );
};

export default function WonderWeather() {
  const { location, weather, theme } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<HourlyWeatherData>();

  const [hourlyDate, setHourlyDate] = useState<Date | null>(weather.forecast[0].date);

  useEffect(() => {
    if (hourlyDate) {
      fetcher.load(
        `/api/weather?date=${hourlyDate}&latitude=${location.latitude}&longitude=${location.longitude}&timezone=${location.timezone}`
      );
    }
  }, [hourlyDate]);

  return (
    <section className="grid min-h-screen w-full grid-cols-12 gap-4 bg-white font-sans text-black/80 dark:bg-gray-900 dark:text-white">
      <section className="col-span-12">
        <h1 className="sticky top-0 mb-2 bg-white py-4 text-center font-serif text-6xl text-black/80 dark:bg-gray-900 dark:text-white">
          {location.name}
        </h1>
        <div className="w-full">
          <img src={location.image} alt={location.name} />
        </div>
        <section>
          <div className={`bg-${theme}-600 flex flex-col rounded-b-md px-4 py-8 text-white`}>
            <p className="mb-2 text-xl font-light">Current conditions</p>
            <div className="flex flex-row items-center gap-2">
              <img src={weather.image} alt={weather.currentWeatherDescription} />
              <span className="semibold text-2xl">
                {weather.currentTemperature}
                {weather.currentTemperatureUnit}
              </span>
            </div>
            <p className="ml-4 text-2xl">{weather.currentWeatherDescription}</p>
          </div>
          <div className="mb-4 mt-6 text-3xl font-semibold">7-day forecast</div>
        </section>
        <ol className="flex flex-row gap-4 overflow-x-auto">
          {weather.forecast.map(day => {
            const isSelectedDate = day.date === hourlyDate;
            return (
              <li
                key={day.date.getTime()}
                className={`rounded-md p-2 ${isSelectedDate ? `bg-${theme}-600` : `bg-${theme}-400`}`}
              >
                <button className="flex appearance-none flex-col" onClick={() => setHourlyDate(day.date)}>
                  <div>{format(day.date, 'E d')}</div>
                  <img src={day.image} alt={day.weatherDescription} />
                  <div className="flex items-center gap-1 text-center">
                    <span>
                      {day.high}
                      {day.temperatureUnit}
                    </span>
                    <span>|</span>
                    <span>
                      {day.low}
                      {day.temperatureUnit}
                    </span>
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
        {fetcher.data && hourlyDate ? (
          <section className={`bg-${theme}-300 my-4 p-8 ${fetcher.state === 'loading' ? 'opacity-20' : ''}`}>
            <h2 className={`text-3xl font-semibold text-${theme}-800 text-res-blue-800`}>
              Hourly forecast for {format(hourlyDate, 'MMM d')}
            </h2>
            <ol className="my-4 flex flex-col gap-3">
              {fetcher.data.hours.map(hour => (
                <li
                  key={hour.hour.getTime()}
                  className={`flex flex-row items-center gap-4 p-4 bg-${theme}-600 rounded-md`}
                >
                  <div className="w-20">
                    <div className="font-semibold text-white">{format(hour.hour, 'h a')}</div>
                    <div className="text-white">
                      {Math.round(hour.temperature)}
                      {hour.temperatureUnit}
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-4">
                    <img src={hour.image} alt={hour.weatherDescription} className="h-[45px]" />
                    <div className="text-white">{hour.weatherDescription}</div>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ) : null}
      </section>
    </section>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  console.log('error', error);
  console.log('AN ERROR');
  return <div>Caught the error</div>;
}
