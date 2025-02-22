import { expect, test, vi } from 'vitest';
import { fetchArticle } from '../Article';
import axios from 'axios';

// axiosのモックを作成
vi.mock('axios');
const mockedAxios = axios as typeof axios & { get: ReturnType<typeof vi.fn> };

test('fetchArticle returns article data', async () => {
  const articleId = '123';
  const mockData = { id: articleId, title: 'Test Article' };

  // axios.getが呼ばれたときに返すデータを設定
  mockedAxios.get.mockResolvedValue({ data: mockData });

  const data = await fetchArticle(articleId);

  // 期待されるデータが返ってくるかを確認
  expect(data).toEqual(mockData);
});

test('fetchArticle handles error', async () => {
  const articleId = '123';

  // axios.getがエラーを返すように設定
  mockedAxios.get.mockRejectedValue(new Error('Network Error'));

  try {
    await fetchArticle(articleId);
  } catch (error) {
    // エラーメッセージが正しいかを確認
    expect((error as Error).message).toBe('Network Error');
  }
});
