import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { ArticleType } from '~/types/article';

export function useFetchArticles(keyword: string) {
  return useQuery<ArticleType[]>({
    queryKey: ['articles', keyword],
    queryFn: async () => {
      const response = await axios.get('https://qiita.com/api/v2/items', {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_QIITA_API_TOKEN}`,
        },
        params: {
          fields: 'id,title,created_at,likes_count,tags,user',
          page: '1',
          per_page: '9',
          query: keyword ? `tag:${keyword} OR body:${keyword}` : undefined,
        },
      });
      return response.data;
    },
  });
}
