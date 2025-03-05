import type { Route } from './+types/ArticleHome';
import type { ArticleType } from '~/types/article';
import { useAtom, useAtomValue } from 'jotai';
import { useFetchArticles } from '~/hooks/useFetchArticles';
import { Link } from 'react-router';
import { keywordAtom, apiTokenAtom, pageAtom } from '~/atoms/articleAtoms';
import ArticleCard from '~/components/ArticleCard';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import BarLoader from 'react-spinners/BarLoader';
import { Button } from '~/components/ui/button';
import { useEffect } from 'react';
import { optionsAtom } from '~/atoms/optionsAtom';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Cyber City' },
    {
      name: 'description',
      content: 'Qiitaに投稿された記事を検索し、詳細を表示します。',
    },
    {
      name: 'keywords',
      content: 'Qiita, 技術ブログ, プログラミング, 記事検索',
    },
    { name: 'author', content: 'Cyber City' },
    { property: 'og:title', content: `Cyber City` },
    {
      property: 'og:description',
      content: 'Qiitaに投稿された記事を検索し、詳細を表示します。',
    },
    { property: 'og:type', content: 'website' },
    {
      property: 'og:url',
      content: `https://cyber-city-d68cf.web.app`,
    },
    {
      property: 'og:image',
      content: './logo.png',
    },
  ];
}

export default function ArticleHome() {
  const keyword = useAtomValue(keywordAtom);
  const [apiToken, setApiToken] = useAtom(apiTokenAtom);
  const [page, setPage] = useAtom(pageAtom);
  const options = useAtomValue(optionsAtom);
  const { data, error, isLoading } = useFetchArticles(
    keyword,
    page,
    apiToken,
    options.user,
    options.minStocks,
    options.fromDate,
  );

  useEffect(() => {
    const storedToken = localStorage.getItem('apiToken');
    if (storedToken) {
      setApiToken(storedToken);
    }
  }, [setApiToken]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {!apiToken && (
        <div className="text-white mt-4 h-[calc(100vh-10rem)] w-full flex items-center justify-center">
          画面右上の設定フォームからQiitaのAPIトークンを入力してください
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
      <div className="px-6 w-full md:w-[calc(100%-4rem)] lg:w-[calc(100%-8rem)] text-white">
        {data && apiToken && (
          <>
            <div className="flex justify-between items-end">
              <div className="relative flex flex-col my-4 ml-4 space-y-2">
                <h1 className="text-2xl font-medium text-white">
                  {keyword ? '検索結果' : '新着記事'}
                </h1>
                <p className="text-white/60 text-sm">
                  {keyword
                    ? '検索キーワードを含む最新の記事'
                    : 'Qiitaに投稿された最新の記事'}
                </p>
              </div>
              <h1 className="text-7xl font-extrabold text-white/30 my-3 mr-4">
                <small className="text-white/30 text-sm mr-1">PAGE</small>
                {page}
              </h1>
            </div>
            <hr className="border-t border-white/30 mb-4 mx-2" />
          </>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data &&
            apiToken &&
            data.map((article: ArticleType, index: number) => (
              <div key={index}>
                <Link to={`/${article.id}`}>
                  <ArticleCard {...article} />
                </Link>
              </div>
            ))}
        </div>
      </div>
      {data && apiToken && (
        <div className="my-6 flex justify-between px-6 w-full md:w-[calc(100%-4rem)] lg:w-[calc(100%-8rem)] text-black">
          <div className="flex items-center gap-2">
            <Button
              onClick={handlePreviousPage}
              className={`rounded ${page === 1 ? 'bg-black text-black hover:bg-black hover:text-black' : 'bg-black hover:bg-[#222222]'}`}
            >
              <ChevronLeft />
            </Button>
            <p className={`${page === 1 ? 'text-black' : 'text-white'}`}>
              前へ
            </p>
          </div>
          <p className="text-2xl text-white">{page}</p>
          <div className="flex items-center gap-2">
            <p className="text-white">次へ</p>
            <Button
              onClick={handleNextPage}
              className="bg-black hover:bg-[#222222] rounded"
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
