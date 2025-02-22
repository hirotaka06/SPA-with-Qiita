import type { Route } from './+types/Article';
import type { ArticleType } from '~/types/article';

export function meta({ params }: Route.MetaArgs) {
  const { articleId } = params;
  return [
    { title: `${articleId} の詳細` },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

function fetchArticle(articleId: string): Promise<ArticleType> {
  // qiitaのAPIを使用して記事の情報を取得
  return fetch(`https://qiita.com/api/v2/items/${articleId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
}

export async function loader({ params }: Route.LoaderArgs) {
  const article = await fetchArticle(params.articleId);
  return article;
}

export default function Component({ loaderData }: Route.ComponentProps) {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-3xl">
        <h1 className="text-2xl font-bold">{loaderData.title}</h1>
      </div>
    </div>
  );
}
