import type { Route } from './+types/ArticleHome';
import type { ArticleType } from '~/types/article';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New Home' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export async function fetchArticles(): Promise<ArticleType[]> {
  const response = await axios.get('https://qiita.com/api/v2/items', {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_QIITA_API_TOKEN}`,
    },
  });
  return response.data;
}

export async function clientLoader({}: Route.LoaderArgs) {
  const articles = await fetchArticles();
  return articles;
}

export default function Component({ loaderData }: Route.ComponentProps) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: fetchArticles,
    initialData: loaderData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-3xl">
        {data.map((article: ArticleType, index: number) => (
          <div key={index}>
            <Link to={`/${article.id}`}>
              <h2>{article.title}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
