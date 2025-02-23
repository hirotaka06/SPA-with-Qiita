import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router';
import ArticleHome from '~/routes/ArticleHome';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  // eslint-disable-next-line react/prop-types
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  );

  Wrapper.displayName = 'QueryClientProviderWrapper';

  return Wrapper;
};

test('ページのレンダリング時に記事のタイトルが正しく表示される', async () => {
  render(<ArticleHome />, { wrapper: createWrapper() });

  const articleElement1 = await screen.findByText('Article 1');
  const articleElement2 = await screen.findByText('Article 2');
  expect(articleElement1).toBeInTheDocument();
  expect(articleElement2).toBeInTheDocument();
});
