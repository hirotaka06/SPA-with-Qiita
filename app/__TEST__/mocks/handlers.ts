import { http, HttpResponse } from 'msw';

export const handlers = [
  // 全てのアイテムを返すハンドラー
  http.get('https://qiita.com/api/v2/items', () => {
    return HttpResponse.json(mockData);
  }),
  // 特定のIDのアイテムを返すハンドラー
  http.get('https://qiita.com/api/v2/items/:id', (req) => {
    const { id } = req.params;
    const article = mockData.find((data) => data.id === id);
    if (article) {
      return HttpResponse.json(article);
    } else {
      return HttpResponse.json({ error: 'Article not found' }, { status: 404 });
    }
  }),
];

const mockData = [
  { id: '1', title: 'Article 1' },
  { id: '2', title: 'Article 2' },
];
