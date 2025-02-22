import { expect, test, vi } from 'vitest';
import { fetchArticles } from '../ArticleHome';
import axios from 'axios';

// axiosのモックを作成
vi.mock('axios');
const mockedAxios = axios as typeof axios & { get: ReturnType<typeof vi.fn> };

test('fetchArticles returns articles data', async () => {
  const mockData = [
    { id: '1', title: 'Article 1' },
    { id: '2', title: 'Article 2' },
  ];

  // axios.getが呼ばれたときに返すデータを設定
  mockedAxios.get.mockResolvedValue({ data: mockData });

  const data = await fetchArticles();

  // 期待されるデータが返ってくるかを確認
  expect(data).toEqual(mockData);
});

test('fetchArticles handles error', async () => {
  // axios.getがエラーを返すように設定
  mockedAxios.get.mockRejectedValue(new Error('Network Error'));

  try {
    await fetchArticles();
  } catch (error) {
    // エラーメッセージが正しいかを確認
    expect((error as Error).message).toBe('Network Error');
  }
});
