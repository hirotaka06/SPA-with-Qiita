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
    { title: `Qiita記事 ${articleId} の詳細` },
    {
      name: 'description',
      content: 'Qiitaに投稿された記事を検索し、詳細を表示します。',
    },
    {
      name: 'keywords',
      content: 'Qiita, 技術ブログ, プログラミング, 記事検索',
    },
    { name: 'author', content: 'Cyber City' },
    { property: 'og:title', content: `Qiita記事 ${articleId} の詳細` },
    {
      property: 'og:description',
      content: 'Qiitaに投稿された記事を検索し、詳細を表示します。',
    },
    { property: 'og:type', content: 'article' },
    {
      property: 'og:url',
      content: `https://cyber-city-d68cf.web.app/${articleId}`,
    },
    {
      property: 'og:image',
      content: './Image.png',
    },
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
        <div className="text-white mt-4 h-[calc(100vh-10rem)] w-full flex items-center justify-center">
          APIトークンを入力してください
        </div>
      )}
      {error && apiToken && (
        <div className="text-white mt-4 h-[calc(100vh-10rem)] flex items-center justify-center mx-12">
          Error: {error.message}
        </div>
      )}
      {isLoading && apiToken && (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)] w-full">
          <BarLoader color="#ffffff" width={200} />
          <p className="text-white mt-8">読み込み中</p>
        </div>
      )}
      {data && apiToken && (
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
