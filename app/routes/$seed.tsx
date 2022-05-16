import { useParams } from '@remix-run/react';
import { ClientOnly } from 'remix-utils';
import type { LinksFunction } from '@remix-run/server-runtime';
import Kalido from '~/components/Kalido';
import stylesUrl from '~/styles/Kalido.css';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: stylesUrl }];
};

export default function SeedRoute() {
  const { seed: seedParam } = useParams();
  const seed = seedParam || '';

  return <ClientOnly>{() => <Kalido seed={seed} />}</ClientOnly>;
}
