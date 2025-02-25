import { Button } from '~/components/ui/button';
import { useAtom } from 'jotai';
import { keywordAtom, apiTokenAtom } from '~/atoms/articleAtoms';
import React, { useState } from 'react';

export default function Navigation() {
  const [, setKeyword] = useAtom(keywordAtom);
  const [apiToken, setApiToken] = useAtom(apiTokenAtom);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [, setConfirmedToken] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApiToken(event.target.value);
  };

  const handleSearch = () => {
    setKeyword(searchKeyword);
  };

  const handleTokenConfirm = () => {
    setConfirmedToken(apiToken);
  };

  return (
    <div className="fixed top-16 left-0 z-50">
      <h1 className="text-white text-2xl font-bold"></h1>
      <div className="flex items-center mb-4 text-white bg-black rounded">
        <input
          type="text"
          value={searchKeyword}
          onChange={handleInputChange}
          placeholder="検索..."
          className="p-2 border border-gray-300 rounded"
        />
        <Button
          onClick={handleSearch}
          className="ml-2 p-2 bg-[#03090c] border text-white rounded"
        >
          検索
        </Button>
      </div>
      <div className="flex items-center mb-4 text-white bg-black rounded">
        <input
          type="text"
          value={apiToken}
          onChange={handleTokenChange}
          placeholder="APIトークンを入力..."
          className="p-2 border border-gray-300 rounded"
        />
        <Button
          onClick={handleTokenConfirm}
          className="ml-2 p-2 bg-[#03090c] border text-white rounded"
        >
          確定
        </Button>
      </div>
    </div>
  );
}
