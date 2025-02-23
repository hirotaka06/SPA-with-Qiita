import type { Route } from './+types/ArticleHome';
import type { ArticleType } from '~/types/article';
import { Link } from 'react-router';
import { useFetchArticles } from '~/hooks/useFetchArticles';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New Home' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}
export default function ArticleHome() {
  const { data, error, isLoading } = useFetchArticles();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-3xl">
        {data?.map((article: ArticleType, index: number) => (
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
