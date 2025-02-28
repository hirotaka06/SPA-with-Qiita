import type { Route } from './+types/Article';
import { Link } from 'react-router';
import { Button } from '~/components/ui/button';
import { useFetchArticle } from '~/hooks/useFetchArticle';
import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useAtomValue } from 'jotai';
import { apiTokenAtom } from '~/atoms/articleAtoms';

export function meta({ params }: Route.MetaArgs) {
  const { articleId } = params;
  return [
    { title: `${articleId} の詳細` },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Article({ params }: Route.ComponentProps) {
  const apiToken = useAtomValue(apiTokenAtom);
  const { data, error, isLoading } = useFetchArticle(
    params.articleId,
    apiToken,
  );

  useEffect(() => {
    const articleElement = document.querySelector('.article-content');
    if (articleElement) {
      const h1Elements = articleElement.getElementsByTagName('h1');
      for (const h1 of h1Elements) {
        h1.classList.add('font-bold', 'text-2xl');
      }
    }
  }, [data?.rendered_body]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <div className="p-6 w-full md:w-[calc(100%-4rem)] lg:w-[calc(100%-8rem)] text-white gap-4">
        <Link to="/">
          <Button className="text-black bg-white hover:bg-gray-200">
            <ArrowLeft />
          </Button>
        </Link>
        <div
          className="article-content mt-2"
          dangerouslySetInnerHTML={{ __html: data?.rendered_body ?? '' }}
        />
      </div>
    </div>
  );
}
