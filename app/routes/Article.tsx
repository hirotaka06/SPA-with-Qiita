import type { Route } from './+types/Article';
import type { ArticleType } from '~/types/article';
import { Link } from 'react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { fetchArticles } from './ArticleHome';

export function meta({ params }: Route.MetaArgs) {
  const { articleId } = params;
  return [
    { title: `${articleId} の詳細` },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export async function fetchArticle(articleId: string): Promise<ArticleType> {
  const response = await axios.get(
    `https://qiita.com/api/v2/items/${articleId}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_QIITA_API_TOKEN}`,
      },
    },
  );
  return response.data;
}

export async function clientLoader({ params }: Route.LoaderArgs) {
  const article = await fetchArticle(params.articleId);
  return article;
}

export default function Component({ loaderData }: Route.ComponentProps) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['articles', loaderData.id],
    queryFn: () => fetchArticle(loaderData.id),
    initialData: loaderData,
    enabled: !!loaderData.id,
  });

  const queryClient = useQueryClient();

  // ArticleHomeのデータをプリフェッチ
  const prefetchArticles = () => {
    queryClient.prefetchQuery({
      queryKey: ['articles'],
      queryFn: fetchArticles,
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-3xl">
        <h1 className="text-2xl font-bold">{data.title}</h1>
      </div>
      <Link to="/" onMouseEnter={prefetchArticles}>
        戻る
      </Link>
    </div>
  );
}
