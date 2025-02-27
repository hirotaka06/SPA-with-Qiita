import type { Route } from './+types/ArticleHome';
import type { ArticleType } from '~/types/article';
import { useAtom } from 'jotai';
import { useFetchArticles } from '~/hooks/useFetchArticles';
import { Link } from 'react-router';
import { keywordAtom, apiTokenAtom, pageAtom } from '~/atoms/articleAtoms';
import ArticleCard from '~/components/ArticleCard';
import { Loading } from '~/components/Loading';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New Home' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function ArticleHome() {
  const [keyword] = useAtom(keywordAtom);
  const [apiToken] = useAtom(apiTokenAtom);
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
      {isLoading && apiToken && (
        <div className="mt-8">
          <Loading />
        </div>
      )}
      <div className="p-6 w-full md:w-[calc(100%-4rem)] lg:w-[calc(100%-8rem)] text-white grid grid-cols-1 md:grid-cols-3 gap-4">
        {!apiToken && <div>APIトークンを入力してください</div>}
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
        <div className="my-4 flex justify-between w-[calc(100%-8rem)] px-8 text-black">
          <button
            onClick={handlePreviousPage}
            className="p-2 bg-white rounded"
            disabled={page === 1}
          >
            <ArrowLeft />
          </button>
          <button onClick={handleNextPage} className="p-2 bg-white rounded">
            <ArrowRight />
          </button>
        </div>
      )}
    </div>
  );
}
