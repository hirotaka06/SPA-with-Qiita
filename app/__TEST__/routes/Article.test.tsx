import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes } from 'react-router';
import Article from '~/routes/Article';

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
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route path="/:articleId" element={children} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );

  Wrapper.displayName = 'QueryClientProviderWrapper';

  return Wrapper;
};

test('記事の詳細が正しく表示される', async () => {
  render(
    <Article
      params={{ articleId: '1' }}
      loaderData={undefined}
      matches={[
        {
          params: { articleId: '1' },
          id: 'root',
          pathname: '',
          data: undefined,
          handle: undefined,
        },
        {
          params: { articleId: '1' },
          id: 'routes/Article',
          pathname: '/1',
          data: undefined,
          handle: undefined,
        },
      ]}
    />,
    {
      wrapper: createWrapper(),
    },
  );

  const article = await screen.findByText('これはArticle 1');
  expect(article).toBeInTheDocument();
});
