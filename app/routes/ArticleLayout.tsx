import { Outlet } from 'react-router';
import Header from '~/components/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function ArticleLayout() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <header className="m-8">
          <Header />
        </header>
        <main className="pt-16">
          <Outlet />
        </main>
      </QueryClientProvider>
    </>
  );
}
