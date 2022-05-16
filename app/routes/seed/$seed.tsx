import { useParams } from '@remix-run/react';
import { ClientOnly } from 'remix-utils';
import Kalido from '~/components/Kalido';

export default function SeedRoute() {
  const { seed: seedParam } = useParams();
  const seed = seedParam || '';

  return <ClientOnly>{() => <Kalido seed={seed} />}</ClientOnly>;
}
