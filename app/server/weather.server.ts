import { Cacheable } from 'cacheable';
import { format, getHours } from 'date-fns';
import invariant from 'tiny-invariant';

import { wmoToDescriptionMap } from '~/server/weather-constants.server';
import { getResonanceInstance } from './resonance-sdk.server';

interface Wonder {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
  timezone: string;
  image: string;
  imageCredit: string;
}
interface WonderWeatherLocations {
  title: string;
  locations: Wonder[];
}

export const isWonderWeatherLocations = (obj: unknown): obj is WonderWeatherLocations => {
  return (
    typeof obj === 'object' && obj !== null && 'title' in obj && 'locations' in obj && Array.isArray(obj.locations)
  );
};

export const isWonderWeatherLocation = (obj: unknown): obj is Wonder => {
  return typeof obj === 'object' && obj !== null && 'id' in obj && 'latitude' in obj;
};

export const defaultWonders: WonderWeatherLocations = {
  title: 'Weather at the wonders',
  locations: [
    {
      id: 'cristo-redentor',
      latitude: '-22.947137638391826',
      longitude: '-43.2100034041744',
      timezone: 'America/Sao_Paulo',
      name: 'Christ the Redeemer',
      image:
        'https://images.unsplash.com/photo-1705937565467-d073fe86e8f4?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      imageCredit:
        'Photo by <a href="https://unsplash.com/@dpaola?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Daniel de Paola</a> on <a href="https://unsplash.com/photos/a-statue-of-jesus-is-shown-against-a-blue-sky-8vo6ZVb0e-M?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>',
    },
    {
      id: 'petra',
      latitude: '30.32884857237885',
      longitude: '35.444402735662116',
      timezone: 'Asia/Amman',
      name: 'Petra',
      image:
        'https://images.unsplash.com/photo-1501232060322-aa87215ab531?q=80&w=2376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      imageCredit:
        'Photo by <a href="https://unsplash.com/@briankairuz?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Brian Kairuz</a> on <a href="https://unsplash.com/photos/petra-jordan-5JHj33-s604?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>',
    },
    {
      id: 'great-wall-of-china',
      latitude: '40.432507963607684',
      longitude: '116.57019278787784',
      timezone: 'Asia/Shanghai',
      name: 'Great Wall of China',
      image:
        'https://images.unsplash.com/photo-1712694450242-58f3c134670c?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      imageCredit:
        'Photo by <a href="https://unsplash.com/@qld_traveller?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Sheila C</a> on <a href="https://unsplash.com/photos/a-large-stone-wall-with-a-walkway-leading-to-it-Hx9Vn9jNgno?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>',
    },
    {
      id: 'machu-picchu',
      latitude: '-13.162880780936588',
      longitude: '-72.54507415298558',
      timezone: 'America/Lima',
      name: 'Machu Picchu',
      image:
        'https://images.unsplash.com/photo-1714339692178-7917d149c2aa?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      imageCredit:
        'Photo by <a href="https://unsplash.com/@markkuiper?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Mark Kuiper</a> on <a href="https://unsplash.com/photos/a-view-of-a-mountain-range-with-a-cloudy-sky-MPePKTwWhtk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>',
    },
    {
      id: 'chichen-itza',
      latitude: '20.683358720787297',
      longitude: '-88.5685627341628',
      timezone: 'America/Mexico_City',
      name: 'Chichén-Itzá',
      image:
        'https://images.unsplash.com/photo-1561577101-aa749bffbb70?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      imageCredit:
        'Photo by <a href="https://unsplash.com/@christinaabken?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Christina Abken</a> on <a href="https://unsplash.com/photos/gray-temple-JELUPXqdKDw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>',
    },
    {
      id: 'colosseum',
      name: 'Colosseum',
      latitude: '41.89040984144197',
      longitude: '12.492252354883872',
      timezone: 'Europe/Rome',
      image:
        'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      imageCredit:
        'Photo by <a href="https://unsplash.com/@cadop?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Mathew Schwartz</a> on <a href="https://unsplash.com/photos/coliseum-italy-s87bBFZviAU?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>',
    },
    {
      id: 'taj-mahal',
      name: 'Taj Mahal',
      latitude: '27.175335666904598',
      longitude: '78.04217438319513',
      timezone: 'Asia/Kolkata',
      image:
        'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2371&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      imageCredit:
        'Photo by <a href="https://unsplash.com/@jovynchamb?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Jovyn Chamb</a> on <a href="https://unsplash.com/photos/taj-mahal-india-iWMfiInivp4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>',
    },
  ],
};

export const getWonderWeatherLocations = async ({
  request,
  userData,
  locationId,
  useDefault = false,
}: {
  request: Request;
  userData: Record<string, unknown>;
  locationId?: string;
  useDefault?: boolean;
}) => {
  const resonance = getResonanceInstance();
  const results: WonderWeatherLocations = useDefault
    ? defaultWonders
    : await resonance.loadCustomization<WonderWeatherLocations>({
        customizationType: 'wonder-weather-locations',
        surfaceId: 'WONDER_LIST',
        request,
        userData: userData,
        defaultValue: defaultWonders,
      });
  if (locationId) {
    const location = results.locations.find(({ id }) => id === locationId);
    return { wonder: location };
  }
  return { wonders: results };
};

export interface WonderWeatherColor {
  colorTheme: string;
}

const defaultTheme: WonderWeatherColor = {
  colorTheme: 'resBlue',
};

export const getWonderWeatherTheme = async ({
  request,
  surface = 'WONDER_SCREEN',
  userData,
  useDefault = false,
}: {
  request: Request;
  surface: string;
  userData: Record<string, unknown>;
  useDefault?: boolean;
}) => {
  const resonance = getResonanceInstance();
  const results: WonderWeatherColor = useDefault
    ? defaultTheme
    : await resonance.loadCustomization({
        customizationType: 'wonder-weather-color',
        surfaceId: surface,
        request,
        userData,
        defaultValue: defaultTheme,
      });
  return { theme: results };
};

const weatherCache = new Cacheable({ ttl: '10m' });
export const getWeatherData = async (location: Wonder): Promise<WeatherData> => {
  const cachedResult = (await weatherCache.get(location.id)) as WeatherData;
  if (cachedResult) {
    return cachedResult;
  } else {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=weather_code,temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_probability_max&temperature_unit=fahrenheit&timezone=${location.timezone}`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      if (data.error) {
        // So far the only error I have seen is with bad timezone. If other error some up, we can deal with them
        // more specifically
        res = await fetch(url.replace(/&timezone=.*&?/, ''));
        data = await res.json();
        if (data.error) {
          return {
            currentTemperature: 0,
            currentTemperatureUnit: 'F',
            currentWeatherCode: 0,
            currentWeatherDescription: 'Unknown',
            image: '',
            forecast: [],
          };
        }
      }
      const weatherData = convertToWeatherData(data);
      await weatherCache.set(location.id, weatherData);
      return weatherData;
    } catch (err) {
      console.log('error loading weather data', err);
      return {
        currentTemperature: 0,
        currentTemperatureUnit: 'F',
        currentWeatherCode: 0,
        currentWeatherDescription: 'Unknown',
        image: '',
        forecast: [],
      };
    }
  }
};

interface WeatherDataFromAPI {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    uv_index_max: number[];
    precipitation_probability_max: number[];
    weather_code: number[];
  };
  daily_units: {
    temperature_2m_max: string;
  };

  current: {
    temperature_2m: number;
    weather_code: number;
  };
  current_units: {
    temperature_2m: string;
  };
}

export interface WeatherData {
  currentTemperature: number;
  currentTemperatureUnit: string;
  currentWeatherCode: number;
  currentWeatherDescription: string;
  image: string;
  forecast: DayWeather[];
}

interface DayWeather {
  date: Date;
  temperatureUnit: string;
  high: number;
  low: number;
  uvIndex: number;
  precipitationProbability: number;
  weatherCode: number;
  weatherDescription: string;
  image: string;
}

const convertToWeatherData = (data: WeatherDataFromAPI): WeatherData => {
  const forecast: DayWeather[] = data.daily.time.map((date: string, index: number) => ({
    date: new Date(date),
    temperatureUnit: data.daily_units.temperature_2m_max,
    high: Math.round(data.daily.temperature_2m_max[index]),
    low: Math.round(data.daily.temperature_2m_min[index]),
    uvIndex: data.daily.uv_index_max[index],
    precipitationProbability: data.daily.precipitation_probability_max[index],
    weatherCode: data.daily.weather_code[index],
    weatherDescription: codeToDescription(data.daily.weather_code[index]),
    image: codeToImage(data.daily.weather_code[index]),
  }));
  return {
    currentTemperature: data.current.temperature_2m,
    currentTemperatureUnit: data.current_units.temperature_2m,
    currentWeatherCode: data.current.weather_code,
    currentWeatherDescription: codeToDescription(data.current.weather_code),
    image: codeToImage(data.current.weather_code),
    forecast,
  };
};
const codeToDescription = (code: number, date?: Date, sunriseHour = 7, sunsetHour = 21) => {
  const hour = date ? getHours(date) : 12;
  const isNight = hour <= sunriseHour || hour >= sunsetHour;
  return wmoToDescriptionMap[code]?.[isNight ? 'night' : 'day'].description ?? 'Unknown';
};
const codeToImage = (code: number, date?: Date, sunriseHour = 7, sunsetHour = 21) => {
  const hour = date ? getHours(date) : 12;
  const isNight = hour <= sunriseHour || hour >= sunsetHour;
  return wmoToDescriptionMap[code]?.[isNight ? 'night' : 'day'].image ?? '';
};

export const getWonderScreenData = async ({
  userData,
  request,
  locationId,
  useDefault,
}: {
  userData: Record<string, unknown>;
  request: Request;
  locationId: string;
  useDefault: boolean;
}) => {
  const { wonder } = await getWonderWeatherLocations({
    request,
    userData,
    locationId,
    useDefault,
  });
  if (!isWonderWeatherLocation(wonder)) {
    console.log('no wonder');
    return { wonder: null, weatherData: null, wonderTheme: null };
  }
  const [weatherData, { theme: wonderTheme }] = await Promise.all([
    getWeatherData(wonder),
    getWonderWeatherTheme({
      request,
      surface: 'WONDER_SCREEN',
      userData,
      useDefault,
    }),
  ]);
  return {
    wonder,
    weatherData,
    wonderTheme,
  };
};

export interface HourlyWeatherData {
  hours: HourlyWeatherStats[];
}

interface HourlyWeatherStats {
  hour: Date;
  temperature: number;
  temperatureUnit: string;
  precipitationProbability: string;
  precipitation: number;
  precipitationUnit: string;
  weatherCode: number;
  weatherDescription: string;
  image: string;
}

const hourlyCache = new Cacheable({ ttl: '1m' });
export const getHourlyWeather = async ({
  latitude,
  longitude,
  date,
  timezone,
}: {
  latitude?: number | string;
  longitude?: number | string;
  date: Date;
  timezone?: string;
}): Promise<HourlyWeatherData> => {
  const day = format(date, 'yyyy-MM-dd');
  const cacheKey = `${latitude}:${longitude}:${day}`;
  const cachedResult = (await hourlyCache.get(cacheKey)) as HourlyWeatherData;
  if (cachedResult) {
    return cachedResult;
  } else {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=weather_code,temperature_2m,precipitation_probability,precipitation&start_date=${day}&end_date=${day}&temperature_unit=fahrenheit&recipitation_unit=inch&daily=sunrise,sunset&timezone=${timezone}`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      if (data.error) {
        // So far the only error I have seen is with bad timezone. If other error some up, we can deal with them
        // more specifically
        res = await fetch(url.replace(/&timezone=.*&?/, ''));
        data = await res.json();
        if (data.error) {
          return { hours: [] };
        }
      }
      const hourlyData = convertToHourlyData(data);
      hourlyCache.set(cacheKey, hourlyData);
      return hourlyData;
    } catch (err) {
      console.log(
        "We hate to rain on your parade, but we couldn't fetch the weather data. Please try again soon.",
        err
      );
      return { hours: [] };
    }
  }
};

interface HourlyWeatherDataFromApi {
  hourly: {
    time: string[];
    temperature_2m: number[];
    precipitation_probability: string[];
    precipitation: number[];
    weather_code: number[];
  };
  hourly_units: {
    temperature_2m: string;
    precipitation: string;
  };
  daily: {
    sunrise: string[];
    sunset: string[];
  };
}

const convertToHourlyData = (data: HourlyWeatherDataFromApi): HourlyWeatherData => {
  const sunriseHour = getHours(new Date(data.daily.sunrise[0]));
  const sunsetHour = getHours(new Date(data.daily.sunset[0])) + 1;
  return {
    hours: data.hourly.time.map((time: string, index: number) => ({
      hour: new Date(time),
      temperature: Math.round(data.hourly.temperature_2m[index]),
      temperatureUnit: data.hourly_units.temperature_2m,
      precipitation: data.hourly.precipitation[index],
      precipitationUnit: data.hourly_units.precipitation,
      precipitationProbability: data.hourly.precipitation_probability[index],
      weatherCode: data.hourly.weather_code[index],
      weatherDescription: codeToDescription(data.hourly.weather_code[index], new Date(time), sunriseHour, sunsetHour),
      image: codeToImage(data.hourly.weather_code[index], new Date(time), sunriseHour, sunsetHour),
    })),
  };
};
