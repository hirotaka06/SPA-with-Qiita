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

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New Home' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function ArticleHome() {
  const keyword = useAtomValue(keywordAtom);
  const apiToken = useAtomValue(apiTokenAtom);
  const [page, setPage] = useAtom(pageAtom);
  const { data, error, isLoading } = useFetchArticles(keyword, page, apiToken);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      {!apiToken && (
        <div className="text-white">APIトークンを入力してください</div>
      )}
      {isLoading && apiToken && (
        <div className="mt-12 flex flex-col items-center justify-center">
          <BarLoader color="#ffffff" width={200} />
          <p className="text-white mt-4">読み込み中</p>
        </div>
      )}
      <div className="px-6 w-full md:w-[calc(100%-4rem)] lg:w-[calc(100%-8rem)] text-white grid grid-cols-1 md:grid-cols-3 gap-4">
        {error && apiToken && <div>Error: {error.message}</div>}
        {data &&
          data.map((article: ArticleType, index: number) => (
            <div key={index}>
              <Link to={`/${article.id}`}>
                <ArticleCard {...article} />
              </Link>
            </div>
          ))}
      </div>
      {data && (
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
