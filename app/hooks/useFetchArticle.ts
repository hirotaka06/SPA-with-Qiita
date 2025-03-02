import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { ArticleType } from '~/types/article';
import { getErrorMessage } from '~/utils/errorHandler';

export function useFetchArticle(articleId: string, apiToken: string) {
  return useQuery<ArticleType>({
    queryKey: ['articles', articleId],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `https://qiita.com/api/v2/items/${articleId}`,
          {
            headers: {
              Authorization: `Bearer ${apiToken}`,
            },
          },
        );
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(getErrorMessage(error.response.status));
        }
        throw new Error(
          'アプリ内で予期しないエラーが発生しました。アプリ製作者にお問い合わせください。',
        );
      }
    },
    enabled: !!articleId,
  });
}
