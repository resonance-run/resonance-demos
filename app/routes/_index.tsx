import type { Route } from './+types/_index';
import { Welcome } from '../welcome/welcome';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Resonance Demos' }, { name: 'description', content: 'Behold what Resonance can do for you' }];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <Welcome />;
}
