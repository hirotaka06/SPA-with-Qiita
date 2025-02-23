import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { ArticleType } from '~/types/article';

export function useFetchArticle(articleId: string) {
  return useQuery<ArticleType>({
    queryKey: ['articles', articleId],
    queryFn: async () => {
      const response = await axios.get(
        `https://qiita.com/api/v2/items/${articleId}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_QIITA_API_TOKEN}`,
          },
        },
      );
      return response.data;
    },
    enabled: !!articleId,
  });
}
