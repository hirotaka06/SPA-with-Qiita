import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes } from 'react-router';
import Article from '~/routes/Article';
import userEvent from '@testing-library/user-event';
import Header from '~/components/Header';

// 各テストの前にローカルストレージをクリア
beforeEach(() => {
  localStorage.clear();
});

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

test('初回レンダリング時にAPIトークンを入力してくださいが表示される', async () => {
  render(
    <div>
      <Header />
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

  const articleElement1 =
    await screen.findByText('APIトークンを入力してください');
  expect(articleElement1).toBeInTheDocument();
});

test('有効なトークンの場合、記事の詳細が正しく表示される', async () => {
  render(
    <div>
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
      <Header />
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

  const articleElement = await screen.findByText('これはArticle 1');
  expect(articleElement).toBeInTheDocument();
});

test('無効なAPIトークンが入力された場合、401のエラーメッセージが表示される', async () => {
  render(
    <div>
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
      <Header />
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
  await userEvent.type(tokenInput, 'invalid-token');
  const confirmButton = screen.getByRole('button', {
    name: 'APIトークンを登録',
  });
  await userEvent.click(confirmButton);
  const errorMessage = await screen.findByText(
    'Error: 無効なAPIトークンです。トークンを確認し、再試行してください。',
  );
  expect(errorMessage).toBeInTheDocument();
});

test('存在しないarticleIdが指定された場合、404のエラーメッセージが表示される', async () => {
  render(
    <div>
      <Article
        params={{ articleId: '999' }}
        loaderData={undefined}
        matches={[
          {
            params: { articleId: '999' },
            id: 'root',
            pathname: '',
            data: undefined,
            handle: undefined,
          },
          {
            params: { articleId: '999' },
            id: 'routes/Article',
            pathname: '/999',
            data: undefined,
            handle: undefined,
          },
        ]}
      />
      <Header />
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
  const errorMessage = await screen.findByText(
    'Error: リソースが見つかりません。URLを確認してください。',
  );
  expect(errorMessage).toBeInTheDocument();
});
