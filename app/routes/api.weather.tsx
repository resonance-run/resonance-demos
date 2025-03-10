import { getHourlyWeather, getWonderScreenData, getWonderWeatherLocations } from '~/server/weather.server';
import type { Route } from './+types/api.weather';

export const loader = async ({ request }: Route.LoaderArgs) => {
  const personaData = request.headers.get('X-Res-Persona-Data');
  const userData = personaData ? JSON.parse(personaData) : { id: 'sample' };
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const locationId = searchParams.get('location') as string;
  const date = searchParams.get('date') as string;
  if (locationId) {
    const res = await getWonderScreenData({
      request,
      userData,
      locationId,
      useDefault: searchParams.has('useDefault'),
    });
    return Response.json(res);
  } else if (date) {
    return Response.json(
      await getHourlyWeather({
        date: new Date(date),
        latitude: searchParams.get('latitude') as string,
        longitude: searchParams.get('latitude') as string,
        timezone: searchParams.get('timezone') as string,
      })
    );
  }
  const results = await getWonderWeatherLocations({
    request,
    userData,
    locationId,
    useDefault: searchParams.has('useDefault'),
  });

  if (!results) {
    return new Response(null, {
      status: 404,
      statusText: 'Weather data not found',
    });
  }
  return Response.json(results.wonders);
};
