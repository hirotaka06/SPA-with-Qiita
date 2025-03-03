import { renderHook, waitFor } from '@testing-library/react';
import { useFetchArticle } from '~/hooks/useFetchArticle';
import { expect, test } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router';

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

test('useFetchArticleが正しく記事を取得する', async () => {
  const { result } = renderHook(() => useFetchArticle('1', 'valid-token'), {
    wrapper: createWrapper(),
  });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(result.current.data).toEqual({
    id: '1',
    title: 'Article 1',
    created_at: '2023-01-01T00:00:00Z',
    likes_count: 10,
    tags: [{ name: 'JavaScript' }, { name: 'React' }],
    user: {
      id: 'user1',
      name: 'User One',
      profile_image_url: 'https://example.com/user1.jpg',
    },
    body: 'これはArticle 1',
  });
  expect(result.current.isLoading).toBeFalsy();
  expect(result.current.error).toBeNull();
});

test('articleIdを変えると、そのarticleIdと一致する記事を取得する', async () => {
  const { result } = renderHook(() => useFetchArticle('2', 'valid-token'), {
    wrapper: createWrapper(),
  });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(result.current.data).toEqual({
    id: '2',
    title: 'Article 2',
    created_at: '2023-02-01T00:00:00Z',
    likes_count: 20,
    tags: [{ name: 'TypeScript' }, { name: 'Node.js' }],
    user: {
      id: 'user2',
      name: 'User Two',
      profile_image_url: 'https://example.com/user2.jpg',
    },
    body: 'これはArticle 2',
  });
  expect(result.current.isLoading).toBeFalsy();
  expect(result.current.error).toBeNull();
});

test('articleIdがない場合、クエリが無効化される', () => {
  const { result } = renderHook(() => useFetchArticle('', 'valid-token'), {
    wrapper: createWrapper(),
  });

  expect(result.current.status).toBe('pending');
  expect(result.current.data).toBeUndefined();
  expect(result.current.isLoading).toBeFalsy();
  expect(result.current.error).toBeNull();
});

test('APIトークンがない場合、クエリが無効化される', () => {
  const { result } = renderHook(() => useFetchArticle('1', ''), {
    wrapper: createWrapper(),
  });

  expect(result.current.status).toBe('pending');
  expect(result.current.data).toBeUndefined();
  expect(result.current.isLoading).toBeFalsy();
  expect(result.current.error).toBeNull();
});

test('APIトークンが間違っている場合、401エラーが返される', async () => {
  const { result } = renderHook(() => useFetchArticle('1', 'invalid-token'), {
    wrapper: createWrapper(),
  });

  await waitFor(() => expect(result.current.status).toBe('error'));
  expect(result.current.data).toBeUndefined();
  expect(result.current.isLoading).toBeFalsy();
  expect(result.current.error).toBeDefined();
  expect(result.current.error?.message).toBe(
    '無効なAPIトークンです。トークンを確認し、再試行してください。',
  );
});

test('存在しないarticleIdが指定された場合、404エラーが返される', async () => {
  const { result } = renderHook(() => useFetchArticle('999', 'valid-token'), {
    wrapper: createWrapper(),
  });

  await waitFor(() => expect(result.current.status).toBe('error'));
  expect(result.current.data).toBeUndefined();
  expect(result.current.isLoading).toBeFalsy();
  expect(result.current.error).toBeDefined();
  expect(result.current.error?.message).toBe(
    'リソースが見つかりません。URLを確認してください。',
  );
});
