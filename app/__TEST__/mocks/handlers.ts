import { http, HttpResponse } from 'msw';

export const handlers = [
  // 全てのアイテムを返すハンドラー
  http.get('https://qiita.com/api/v2/items', ({ request }) => {
    const token = request.headers.get('Authorization');
    if (token !== 'Bearer ' + 'valid-token') {
      return HttpResponse.json({ error: 'Invalid API token' }, { status: 401 });
    }
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
  {
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
  },
  {
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
  },
];
