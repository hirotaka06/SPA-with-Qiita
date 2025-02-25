import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { ArticleType } from '~/types/article';

export function useFetchArticles(
  keyword: string,
  page: number,
  apiToken: string,
) {
  return useQuery<ArticleType[]>({
    queryKey: ['articles', keyword, page, apiToken],
    queryFn: async () => {
      try {
        const response = await axios.get('https://qiita.com/api/v2/items', {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
          params: {
            fields: 'id,title,created_at,likes_count,tags,user',
            page: page.toString(),
            per_page: '12',
            query: keyword ? `tag:${keyword} OR body:${keyword}` : undefined,
          },
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          throw new Error('無効なAPIトークンです。');
        }
        throw error;
      }
    },
    enabled: !!apiToken,
  });
}
