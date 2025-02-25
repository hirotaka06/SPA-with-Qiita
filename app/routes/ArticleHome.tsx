import React, { useState } from 'react';
import type { Route } from './+types/ArticleHome';
import type { ArticleType } from '~/types/article';
import { Link } from 'react-router';
import { useFetchArticles } from '~/hooks/useFetchArticles';
import ArticleCard from '~/components/ArticleCard';
import { Loading } from '~/components/Loading';
import { useAtom } from 'jotai';
import { keywordAtom, apiTokenAtom } from '~/atoms/articleAtoms';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New Home' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function ArticleHome() {
  const [keyword] = useAtom(keywordAtom);
  const [apiToken] = useAtom(apiTokenAtom);
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useFetchArticles(keyword, page, apiToken);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      {isLoading && apiToken && <Loading />}
      <div className="p-6 mx-10 w-full text-white grid grid-cols-1 md:grid-cols-3 gap-2">
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
      <div className="flex mt-4">
        <button
          onClick={handlePreviousPage}
          className="mr-2 p-2 bg-[#03090c] border text-white rounded"
          disabled={page === 1}
        >
          前のページへ
        </button>
        <button
          onClick={handleNextPage}
          className="p-2 bg-[#03090c] border text-white rounded"
        >
          次のページへ
        </button>
      </div>
    </div>
  );
}
