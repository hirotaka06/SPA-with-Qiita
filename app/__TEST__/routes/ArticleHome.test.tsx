import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router';
import ArticleHome from '~/routes/ArticleHome';
import userEvent from '@testing-library/user-event';

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

test('初回レンダリング時にAPIトークンを入力してくださいが表示される', async () => {
  render(<ArticleHome />, { wrapper: createWrapper() });

  const articleElement1 =
    await screen.findByText('APIトークンを入力してください');
  expect(articleElement1).toBeInTheDocument();
});

test('APIトークンが確認された後に記事が表示される', async () => {
  render(<ArticleHome />, { wrapper: createWrapper() });

  // APIトークンを入力して確定ボタンをクリック
  const tokenInput = screen.getByPlaceholderText('APIトークンを入力...');
  await userEvent.type(tokenInput, 'valid-token');
  const confirmButton = screen.getByRole('button', { name: '確定' });
  await userEvent.click(confirmButton);

  // 記事が表示されることを確認
  const articleElement2 = await screen.findByText('Article 1');
  expect(articleElement2).toBeInTheDocument();
});

test('無効なAPIトークンが入力された場合、エラーメッセージが表示される', async () => {
  render(<ArticleHome />, { wrapper: createWrapper() });

  // 無効なAPIトークンを入力して確定ボタンをクリック
  const tokenInput = screen.getByPlaceholderText('APIトークンを入力...');
  await userEvent.type(tokenInput, 'invalid-token');
  const confirmButton = screen.getByRole('button', { name: '確定' });
  await userEvent.click(confirmButton);

  // エラーメッセージが表示されることを確認
  const errorMessage = await screen.findByText(
    'Error: 無効なAPIトークンです。',
  );
  expect(errorMessage).toBeInTheDocument();
});
