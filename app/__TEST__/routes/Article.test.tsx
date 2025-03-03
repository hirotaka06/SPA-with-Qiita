import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes } from 'react-router';
import Article from '~/routes/Article';
import userEvent from '@testing-library/user-event';
import ArticleLayout from '~/routes/ArticleLayout';

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
    <div>
      <ArticleLayout />
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
      />
    </div>,
    {
      wrapper: createWrapper(),
    },
  );

  const settingsButton = screen.getByRole('button', {
    name: '設定フォームを表示',
  });
  await userEvent.click(settingsButton);

  const tokenInput = screen.getByPlaceholderText('APIトークンを入力...');
  await userEvent.type(tokenInput, 'valid-token');
  const confirmButton = screen.getByRole('button', {
    name: 'APIトークンを登録',
  });
  await userEvent.click(confirmButton);

  const article = await screen.findByText('これはArticle 1');
  expect(article).toBeInTheDocument();
});
