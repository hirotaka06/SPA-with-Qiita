import type { Route } from './+types/Article';
import { Link } from 'react-router';
import { useFetchArticle } from '~/hooks/useFetchArticle';

export function meta({ params }: Route.MetaArgs) {
  const { articleId } = params;
  return [
    { title: `${articleId} の詳細` },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Article({ params }: Route.ComponentProps) {
  const { data, error, isLoading } = useFetchArticle(params.articleId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-3xl">
        <h1 className="text-2xl font-bold">{data?.title}</h1>
      </div>
      <Link to="/">戻る</Link>
    </div>
  );
}
