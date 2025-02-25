import React, { useState } from 'react';
import type { Route } from './+types/ArticleHome';
import type { ArticleType } from '~/types/article';
import { Link } from 'react-router';
import { useFetchArticles } from '~/hooks/useFetchArticles';
import ArticleCard from '~/components/ArticleCard';
import { Loading } from '~/components/Loading';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New Home' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function ArticleHome() {
  const [keyword, setKeyword] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [apiToken, setApiToken] = useState('');
  const [confirmedToken, setConfirmedToken] = useState('');
  const { data, error, isLoading } = useFetchArticles(
    searchKeyword,
    page,
    confirmedToken,
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApiToken(event.target.value);
  };

  const handleTokenConfirm = () => {
    setConfirmedToken(apiToken);
  };

  const handleSearch = () => {
    setSearchKeyword(keyword);
    setPage(1);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <div className="flex items-center mb-4 text-white">
        <input
          type="text"
          value={keyword}
          onChange={handleInputChange}
          placeholder="検索..."
          className="p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleSearch}
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          検索
        </button>
      </div>
      <div className="flex items-center mb-4 text-white">
        <input
          type="text"
          value={apiToken}
          onChange={handleTokenChange}
          placeholder="APIトークンを入力..."
          className="p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleTokenConfirm}
          className="ml-2 p-2 bg-green-500 text-white rounded"
        >
          確定
        </button>
      </div>
      <div className="p-6 border mx-10 w-full border-gray-200 dark:border-gray-700 rounded-3xl text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {!confirmedToken && <div>APIトークンを入力してください</div>}
        {isLoading && confirmedToken && <Loading />}
        {error && confirmedToken && <div>Error: {error.message}</div>}
        {data?.map((article: ArticleType, index: number) => (
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
          className="mr-2 p-2 bg-blue-500 text-white rounded"
          disabled={page === 1}
        >
          前のページへ
        </button>
        <button
          onClick={handleNextPage}
          className="p-2 bg-blue-500 text-white rounded"
        >
          次のページへ
        </button>
      </div>
    </div>
  );
}
