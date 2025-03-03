import { getResonanceInstance } from '~/server/resonance-sdk.server';
import type { Route } from './+types/api.live-customization';
import { data } from 'react-router';

export const loader = async ({ request }: Route.LoaderArgs) => {
  const resonance = getResonanceInstance();
  const personaData = request.headers.get('X-Res-Persona-Data');
  const userData = personaData ? JSON.parse(personaData) : { id: 'sample' };
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const surfaceId = searchParams.get('surfaceId') as string;
  const customizationType = searchParams.get('customizationType') as string;
  if (surfaceId && customizationType) {
    const customization =
      (await resonance.loadCustomization({
        customizationType,
        surfaceId,
        request,
        userData,
      })) ?? null;
    return data({
      customization,
    });
  }
};
