import { getResonanceInstance } from '~/server/resonance-sdk.server';
import type { Route } from './+types/api.poplin';
interface PoplinTabs {
  tabs: {
    title: string;
    path: string;
    icon: string;
  }[];
}
export const loader = async ({ request }: Route.LoaderArgs) => {
  const personaData = request.headers.get('X-Res-Persona-Data');
  const userData = personaData ? JSON.parse(personaData) : { id: 'sample' };

  const defaultTabs: PoplinTabs = {
    tabs: [
      { title: 'Laundry', path: '/laundry', icon: 'shirtOutline' },
      { title: 'Orders', path: '/orders', icon: 'receiptOutline' },
      { title: 'Account', path: '/account', icon: 'personOutline' },
      { title: 'Referrals', path: '/referrals', icon: 'giftOutline' },
    ],
  };
  const resonance = getResonanceInstance();
  const results: PoplinTabs = await resonance.loadCustomization({
    customizationType: 'poplin-tabs',
    surfaceId: 'IONIC_APP',
    userData,
    request,
    defaultValue: defaultTabs,
  });
  return Response.json({ data: results }, { headers: { 'Access-Control-Allow-Origin': '*' } });
};
