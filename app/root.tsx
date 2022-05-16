import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { ClientOnly } from 'remix-utils';
import Container from '~/components/Container';
import stylesUrl from '~/styles/kalido.css';

import type { LinksFunction } from '@remix-run/server-runtime';
import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Kalido',
  viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: stylesUrl }];
};

export default function App() {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <ClientOnly>
          {() => (
            <Container>
              <Outlet />
            </Container>
          )}
        </ClientOnly>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
