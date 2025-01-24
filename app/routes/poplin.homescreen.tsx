import { getDemoUser, setDemoUserCookiesHeaders } from 'server/personas.server';
import { getResonanceInstance } from 'server/resonance-sdk.server';
import { data, Link } from 'react-router';
import { Icon, IconName, IconSize } from '~/components/Icon';
import type { Route } from './+types/poplin.homescreen';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Poplin Demo - Resonance' },
    { name: 'description', content: 'Customizations of the Poplin home screen' },
  ];
}

interface PoplinCtaHomeScreen {
  route: string;
  text: string;
  description: string;
  shape: 'circle' | 'square';
}
export const loader = async ({ request }: Route.LoaderArgs) => {
  const demoUser = await getDemoUser(request);
  const resonance = getResonanceInstance();

  const ctaDefault: PoplinCtaHomeScreen = {
    route: '/learn-more',
    description: 'New order',
    text: 'Do my laundry',
    shape: 'circle',
  };

  const cta: PoplinCtaHomeScreen = await resonance.loadCustomization({
    customizationType: 'poplin-cta-home-screen',
    surfaceId: 'DEFAULT',
    userData: demoUser as unknown as Record<string, unknown>,
    request,
    defaultValue: ctaDefault,
  });
  const referrals = {
    text: '$0 credits - refer & earn',
    route: '/poplin/referrals',
  };
  return data({
    cta,
    referrals,
  });
};

export const action = async ({ request }: Route.ActionArgs) => {
  const headers = await setDemoUserCookiesHeaders(request);
  return data({}, { headers });
};

export default function PoplinDemo({ loaderData }: Route.ComponentProps) {
  const { cta, referrals } = loaderData;

  return (
    <>
      <section className="mt-16">
        <Link
          to={cta.route}
          className={`flex h-[320px] w-[320px] ${
            cta.shape === 'circle' ? 'rounded-full' : 'rounded-md'
          } bg-white p-5 shadow-xl transition-transform duration-1000 hover:scale-105`}
        >
          <div
            className={`h-full w-full ${
              cta.shape === 'circle' ? 'rounded-full' : 'rounded-md'
            } border-8 border-[#ff6189]`}
          >
            <div className="flex h-full flex-col items-center justify-center gap-2">
              <p className="text-xl uppercase tracking-widest" dangerouslySetInnerHTML={{ __html: cta.description }} />
              <p className="text-2xl" dangerouslySetInnerHTML={{ __html: cta.text }} />
              <Icon name={IconName.arrowRight} size={IconSize.large} className="text-[#ff6189]" />
            </div>
          </div>
        </Link>
      </section>
      <div className="mt-20 flex flex-row justify-center">
        <Link
          to={referrals.route}
          className="rounded-full bg-[rgb(143,208,255)] px-3 py-1 text-xs uppercase tracking-widest text-black"
        >
          {referrals.text}
        </Link>
      </div>
    </>
  );
}
