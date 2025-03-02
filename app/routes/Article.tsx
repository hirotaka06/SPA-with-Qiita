import type { Route } from './+types/Article';
import { Link } from 'react-router';
import { Button } from '~/components/ui/button';
import { useFetchArticle } from '~/hooks/useFetchArticle';
import { ChevronLeft } from 'lucide-react';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { apiTokenAtom } from '~/atoms/articleAtoms';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import BarLoader from 'react-spinners/BarLoader';

export function meta({ params }: Route.MetaArgs) {
  const { articleId } = params;
  return [
    { title: `${articleId} の詳細` },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Article({ params }: Route.ComponentProps) {
  const [apiToken, setApiToken] = useAtom(apiTokenAtom);
  const { data, error, isLoading } = useFetchArticle(
    params.articleId,
    apiToken,
  );

  useEffect(() => {
    const storedToken = localStorage.getItem('apiToken');
    if (storedToken) {
      setApiToken(storedToken);
    }
  }, [setApiToken]);

  return (
    <div className="flex flex-col items-center justify-center">
      {!apiToken && (
        <div className="text-white mt-4">APIトークンを入力してください</div>
      )}
      {error && apiToken && (
        <div className="text-white mt-4">Error: {error.message}</div>
      )}
      {isLoading && apiToken && (
        <div className="mt-16 flex flex-col items-center justify-center">
          <BarLoader color="#ffffff" width={200} />
          <p className="text-white mt-6">読み込み中</p>
        </div>
      )}
      {data && (
        <div className="p-6 w-full md:w-[calc(100%-4rem)] lg:w-[calc(100%-8rem)] text-white gap-4">
          <div className="flex items-center gap-1">
            <Link to="/">
              <Button className="text-white bg-black hover:bg-[#222222]">
                <ChevronLeft />
              </Button>
            </Link>
            <p className="text-white">記事一覧へ</p>
          </div>
          <h1 className="text-3xl font-semibold mb-4 mt-6 pb-2">
            {data?.title}
          </h1>
          <div className="article-content my-2">
            <div className="prose markdown">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {data.body}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
