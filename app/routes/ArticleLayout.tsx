import { Outlet } from 'react-router';
import Header from '~/components/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navigation from '~/components/Navigation';
const queryClient = new QueryClient();

export default function ArticleLayout() {
  return (
    <>
      <Header />
      <div className="pt-16">
        <Navigation />
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </div>
    </>
  );
}
