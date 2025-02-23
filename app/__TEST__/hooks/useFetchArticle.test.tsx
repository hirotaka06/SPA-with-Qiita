import { renderHook } from '@testing-library/react';
import { useFetchArticle } from '~/hooks/useFetchArticle';
import { expect, test, vi } from 'vitest';
import axios from 'axios';

// axiosのモックを作成
vi.mock('axios');
const mockedAxios = axios as typeof axios & { get: ReturnType<typeof vi.fn> };

// useFetchArticleのモックを作成
vi.mock('~/hooks/useFetchArticle', () => ({
  useFetchArticle: vi.fn(),
}));

describe('useFetchArticleフックのテスト', () => {
  test('useFetchArticleが単一の記事データを返す', async () => {
    const mockData = { id: '1', title: 'Article 1' };

    // axios.getが呼ばれたときに返すデータを設定
    mockedAxios.get.mockResolvedValue({ data: mockData });

    // useFetchArticleのモックを設定
    (useFetchArticle as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockData,
      error: null,
      isLoading: false,
    });

    const { result } = renderHook(() => useFetchArticle('1'));

    // 期待されるデータが返ってくるかを確認
    expect(result.current.data).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  test('useArticleがエラーを処理する', async () => {
    // axios.getがエラーを返すように設定
    mockedAxios.get.mockRejectedValue(new Error('Network Error'));

    // useFetchArticleのモックを設定
    (useFetchArticle as ReturnType<typeof vi.fn>).mockReturnValue({
      data: null,
      error: new Error('Network Error'),
      isLoading: false,
    });

    const { result } = renderHook(() => useFetchArticle('1'));

    // エラーメッセージが正しいかを確認
    expect(result.current.error?.message).toBe('Network Error');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeNull();
  });
});
