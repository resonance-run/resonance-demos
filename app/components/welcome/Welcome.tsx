import logo from '~/components/images/resonance-logo.png';
import iosBadge from '~/components/images/ios-badge.svg';
import googlePlayBadge from '~/components/images/google-play-badge.png';
import { Link, useSearchParams } from 'react-router';
import { DemoContainer } from './DemoContainer';

export function Welcome() {
  const [searchParams] = useSearchParams();
  const lastName = searchParams.get('lastName');
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[200px] sm:w-[400px] max-w-[100vw] p-4">
            <img src={logo} alt="Resonance Systems" className="w-full" />
          </div>
          <p className="text-5xl font-['Orbitron'] text-center">Resonance Demos</p>
          <section className="flex flex-row flex-wrap gap-4 items-center justify-center">
            <DemoContainer
              title="Wonder Weather"
              linkText="Web version"
              to={`/wonder-weather${lastName ? `?lastName=${lastName}` : ''}`}
            >
              <div className="flex flex-row gap-8">
                <a href="https://apps.apple.com/us/app/wonder-weather-by-resonance/id6739744523">
                  <img src={iosBadge} alt="Download on the App Store" className="h-14" />
                </a>
                <a href="https://play.google.com/store/apps/details?id=run.resonance.weather&pcampaignid=web_share">
                  <img src={googlePlayBadge} alt="Get it on Google Play" className="h-14" />
                </a>
              </div>
              {lastName ? (
                <p className="text-center mt-4">
                  Note: When you install the mobile app, remember to set the "Last name" field to{' '}
                  <span className="font-bold text-lg">{lastName}</span> on the Settings tab.
                </p>
              ) : null}
            </DemoContainer>
            <DemoContainer title="Dashboard" linkText="View demo" to="/dashboard-demo">
              <p className="text-center">A personalized dashboard for every user</p>
            </DemoContainer>
          </section>
        </header>
      </div>
    </main>
  );
}
