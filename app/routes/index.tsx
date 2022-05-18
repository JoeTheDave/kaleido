import { useEffect } from 'react';
import { useLoaderData } from '@remix-run/react';
import { useNavigate } from '@remix-run/react';
import { uuid } from 'uuidv4';

import type { LoaderFunction } from '@remix-run/server-runtime';

type LoaderData = {
  seed: string;
};

export const loader: LoaderFunction = async () => {
  // For some reason, spinning up a uuid on the client is resulting in a maximum call stack exceeded error.
  // Creating it on the server inside this loader function solves the problem.
  const randomSeed = uuid();
  return {
    seed: randomSeed,
  };
};

export default function Index() {
  const navigate = useNavigate();
  const { seed } = useLoaderData<LoaderData>();

  useEffect(() => {
    navigate(`/${seed}${location.search}`);
  }, []);

  return <></>;
}
