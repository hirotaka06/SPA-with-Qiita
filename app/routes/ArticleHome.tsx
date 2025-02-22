import type { Route } from './+types/ArticleHome';
import type { ArticleType } from '~/types/article';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New Home' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

function fetchArticles(): Promise<ArticleType[]> {
  // qiitaのAPIを使用して記事一覧の情報を取得
  return fetch('https://qiita.com/api/v2/items')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      return data as ArticleType[];
    })
    .catch((error) => {
      throw error;
    });
}

export async function loader({}: Route.LoaderArgs) {
  const articles = await fetchArticles();
  return articles;
}

export default function Component({ loaderData }: Route.ComponentProps) {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-3xl">
        {loaderData.map((article: ArticleType, index: number) => (
          <div key={index}>
            <h2>{article.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
