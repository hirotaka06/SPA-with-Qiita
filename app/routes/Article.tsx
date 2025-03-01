import type { Route } from './+types/Article';
import { Link } from 'react-router';
import { Button } from '~/components/ui/button';
import { useFetchArticle } from '~/hooks/useFetchArticle';
import { ArrowLeft } from 'lucide-react';
import { useAtomValue } from 'jotai';
import { apiTokenAtom } from '~/atoms/articleAtoms';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
        <h1 className="text-3xl font-semibold mb-4 mt-6 pb-2">{data?.title}</h1>
        <div className="article-content my-2">
          <div className="prose markdown">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {data?.body}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
