import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => [{ title: 'Wonder Weather' }];

export default function WonderWeatherIndex() {
  return (
    <section className="flex h-full flex-col items-center justify-center gap-4 text-lg dark:text-white/90">
      <h1 className="text-5xl font-semibold">Wonder Weather</h1>
      <p>Select one of the Seven Wonders of the World.</p>
      <p>See the weather at the Wonders!</p>
    </section>
  );
}
