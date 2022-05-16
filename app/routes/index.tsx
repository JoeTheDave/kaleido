import { useEffect } from 'react';
import { useLoaderData } from '@remix-run/react';
import { useNavigate } from '@remix-run/react';
import { uuid } from 'uuidv4';

import type { LoaderFunction } from '@remix-run/server-runtime';

type LoaderData = {
  seed: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const randomSeed = uuid();
  return {
    seed: randomSeed,
  };
};

export default function Index() {
  const navigate = useNavigate();
  const { seed } = useLoaderData<LoaderData>();

  useEffect(() => {
    navigate(`/${seed}`);
  }, []);

  return <></>;
}
