import { data } from 'react-router';

import { getWonderWeatherTheme, type WonderWeatherColor } from '~/server/weather.server';
import type { Route } from './+types/api.weather-theme';

export const loader = async ({ request }: Route.LoaderArgs) => {
  const personaData = request.headers.get('X-Res-Persona-Data');
  const userData = personaData ? JSON.parse(personaData) : { id: 'sample' };
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const surface = searchParams.get('surface') ?? 'WONDER_SCREEN';
  const { theme: results }: { theme: WonderWeatherColor } = await getWonderWeatherTheme({
    request,
    surface,
    userData,
    useDefault: searchParams.has('useDefault'),
  });
  return data(results);
};
