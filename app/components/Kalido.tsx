import { RandomService } from '~/services/randomService';

import type { FC } from 'react';

interface KalidoProps {
  seed: string;
}

const Kalido: FC<KalidoProps> = ({ seed }) => {
  const rand = new RandomService(seed || '');
  return (
    <>
      <div>{seed}</div>
      <div>{rand.range(6, 11)}</div>
    </>
  );
};

export default Kalido;
