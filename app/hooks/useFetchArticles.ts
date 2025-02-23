import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { ArticleType } from '~/types/article';

export function useFetchArticles() {
  return useQuery<ArticleType[]>({
    queryKey: ['articles'],
    queryFn: async () => {
      const response = await axios.get('https://qiita.com/api/v2/items', {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_QIITA_API_TOKEN}`,
        },
        params: {
          fields: 'id,title',
        },
      });
      return response.data;
    },
  });
}
