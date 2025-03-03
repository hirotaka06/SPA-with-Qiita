import { renderHook, waitFor } from '@testing-library/react';
import { useFetchArticles } from '~/hooks/useFetchArticles';
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

test('useFetchArticlesが正しく動作し、記事が2件取得できる', async () => {
  const { result } = renderHook(
    () => useFetchArticles('test', 1, 'valid-token'),
    {
      wrapper: createWrapper(),
    },
  );

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(result.current.data).toHaveLength(2);
  expect(result.current.isLoading).toBeFalsy();
  expect(result.current.error).toBeNull();
});

test('APIトークンがない場合、クエリが無効化される', () => {
  const { result } = renderHook(() => useFetchArticles('test', 1, ''), {
    wrapper: createWrapper(),
  });

  expect(result.current.status).toBe('pending');
  expect(result.current.data).toBeUndefined();
  expect(result.current.isLoading).toBeFalsy();
  expect(result.current.error).toBeNull();
});

test('APIトークンが間違っている場合、401エラーが返される', async () => {
  const { result } = renderHook(
    () => useFetchArticles('test', 1, 'invalid-token'),
    {
      wrapper: createWrapper(),
    },
  );

  await waitFor(() => expect(result.current.status).toBe('error'));
  expect(result.current.data).toBeUndefined();
  expect(result.current.isLoading).toBeFalsy();
  expect(result.current.error).toBeDefined();
  expect(result.current.error?.message).toBe(
    '無効なAPIトークンです。トークンを確認し、再試行してください。',
  );
});
