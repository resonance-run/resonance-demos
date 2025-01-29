import logo from '~/components/images/resonance-logo.png';
import iosBadge from '~/components/images/ios-badge.svg';
import googlePlayBadge from '~/components/images/google-play-badge.png';

export function Welcome() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[400px] max-w-[100vw] p-4">
            <img src={logo} alt="Resonance Systems" className="w-full" />
          </div>
          <p className="text-5xl font-['Orbitron'] text-center">Resonance Demos</p>
          <section className="border border-gray-400 rounded-xl p-4">
            <h3 className="text-3xl mb-4 text-center">Wonder Weather</h3>
            <div className="flex flex-row gap-8">
              <a href="https://apps.apple.com/us/app/wonder-weather-by-resonance/id6739744523">
                <img src={iosBadge} alt="Download on the App Store" className="h-14" />
              </a>
              <a href="https://play.google.com/store/apps/details?id=run.resonance.weather&pcampaignid=web_share">
                <img src={googlePlayBadge} alt="Get it on Google Play" className="h-14" />
              </a>
            </div>
            <div className="flex items-center justify-center my-4">
              <a href="https://www.resonance.run/wonder-weather" className="underline text-xl">
                Web version
              </a>
            </div>
          </section>
        </header>
      </div>
    </main>
  );
}
