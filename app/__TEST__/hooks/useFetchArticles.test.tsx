import { renderHook } from '@testing-library/react';
import { useFetchArticles } from '~/hooks/useFetchArticles';
import { expect, test, vi } from 'vitest';
import axios from 'axios';

// axiosのモックを作成
vi.mock('axios');
const mockedAxios = axios as typeof axios & { get: ReturnType<typeof vi.fn> };

// useFetchArticlesのモックを作成
vi.mock('~/hooks/useFetchArticles', () => ({
  useFetchArticles: vi.fn(),
}));

describe('useFetchArticlesフックのテスト', () => {
  test('useFetchArticlesが記事データを返す', async () => {
    const mockData = [
      { id: '1', title: 'Article 1' },
      { id: '2', title: 'Article 2' },
    ];

    // axios.getが呼ばれたときに返すデータを設定
    mockedAxios.get.mockResolvedValue({ data: mockData });

    // useFetchArticlesのモックを設定
    (useFetchArticles as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockData,
      error: null,
      isLoading: false,
    });

    const { result } = renderHook(() => useFetchArticles());

    // 期待されるデータが返ってくるかを確認
    expect(result.current.data).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  test('useFetchArticlesがエラーを処理する', async () => {
    // axios.getがエラーを返すように設定
    mockedAxios.get.mockRejectedValue(new Error('Network Error'));

    // useFetchArticlesのモックを設定
    (useFetchArticles as ReturnType<typeof vi.fn>).mockReturnValue({
      data: null,
      error: new Error('Network Error'),
      isLoading: false,
    });

    const { result } = renderHook(() => useFetchArticles());

    // エラーメッセージが正しいかを確認
    expect(result.current.error?.message).toBe('Network Error');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeNull();
  });
});
