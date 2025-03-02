import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { ArticleType } from '~/types/article';
import { getErrorMessage } from '~/utils/errorHandler';

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
            fields: 'id,title,created_at,likes_count,tags,user,body',
            page: page.toString(),
            per_page: '30',
            query: keyword
              ? `title:${keyword} OR body:${keyword} OR tags:${keyword}`
              : undefined,
          },
        });
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
    enabled: !!apiToken,
  });
}
