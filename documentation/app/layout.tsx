import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './global.css';

export const metadata: Metadata = {
  title: {
    default: 'advpl-specialist',
    template: '%s | advpl-specialist',
  },
  description:
    'Plugin para Claude Code especializado em ADVPL e TLPP para desenvolvimento no ecossistema TOTVS Protheus',
  icons: {
    icon: '/advpl-specialist/favicon.svg',
  },
  openGraph: {
    title: 'advpl-specialist',
    description:
      'Plugin para Claude Code especializado em ADVPL e TLPP para desenvolvimento no ecossistema TOTVS Protheus. 12 comandos, 10 agentes, 14 skills.',
    url: 'https://thalysjuvenal.github.io/advpl-specialist',
    siteName: 'advpl-specialist',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary',
    title: 'advpl-specialist',
    description:
      'Plugin para Claude Code especializado em ADVPL e TLPP para TOTVS Protheus',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider
          search={{
            options: {
              type: 'static',
              api: '/advpl-specialist/api/search',
            },
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
