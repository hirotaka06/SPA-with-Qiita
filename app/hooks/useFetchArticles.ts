import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { ArticleType } from '~/types/article';
import { getErrorMessage } from '~/utils/errorHandler';

export function useFetchArticles(
  keyword: string,
  page: number,
  apiToken: string,
  user?: string,
  minStocks?: number,
  fromDate?: string,
) {
  return useQuery<ArticleType[]>({
    queryKey: ['articles', keyword, page, apiToken, user, minStocks, fromDate],
    queryFn: async () => {
      try {
        const queryParts = [];
        const dateFilter = fromDate
          ? `created:>${new Date(fromDate).toISOString().split('T')[0]}`
          : '';
        const userFilter = user ? `user:${user}` : '';
        const stocksFilter = minStocks ? `stocks:>=${minStocks}` : '';

        if (keyword) {
          queryParts.push(
            `title:${keyword} ${dateFilter} ${userFilter} ${stocksFilter}`,
            `body:${keyword} ${dateFilter} ${userFilter} ${stocksFilter}`,
            `tags:${keyword} ${dateFilter} ${userFilter} ${stocksFilter}`,
          );
        }
        if (!keyword) {
          if (dateFilter) {
            queryParts.push(dateFilter);
          }
          if (userFilter) {
            queryParts.push(userFilter);
          }
          if (stocksFilter) {
            queryParts.push(stocksFilter);
          }
        }
        const query =
          queryParts.length > 0 ? queryParts.join(' OR ') : undefined;

        const response = await axios.get('https://qiita.com/api/v2/items', {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
          params: {
            page: page.toString(),
            per_page: '30',
            query,
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
