import { Link } from 'react-router';
import SearchForm from '~/components/SerchForm';
import ApiForm from '~/components/ApiForm';
import { useState, useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { Settings } from 'lucide-react';

export default function Header() {
  const [isApiFormVisible, setApiFormVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const toggleApiForm = () => {
    setApiFormVisible(!isApiFormVisible);
  };

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex justify-center">
      <header
        className={`fixed top-4 w-[calc(100%-2rem)] z-50 bg-black rounded-xl ${hasScrolled ? 'shadow-[0_4px_18px_rgba(255,255,255,0.12)] border border-white/10' : ''}`}
      >
        <div className="flex justify-between py-4 space-x-2 mx-3 sm:mx-5 md:mx-8 lg:mx-12">
          {/* ロゴ */}
          <Link to="/">
            <img src="/logo.svg" alt="logo" className="w-20 h-12" />
          </Link>
          <div className="flex space-x-4">
            {/* 検索バー*/}
            <SearchForm />
            {/* APIトークン入力フォーム表示ボタン */}
            <Button
              onClick={toggleApiForm}
              className="h-12 rounded-md bg-white text-black hover:bg-gray-200"
              aria-label="APIトークンを入力"
            >
              <Settings />
            </Button>
          </div>
        </div>
      </header>
      {/* APIフォームの表示 */}
      {isApiFormVisible && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
          <div className="fixed top-32 w-[80%] lg:w-[30%] right-[3%] lg:right-12 z-50 ">
            <ApiForm />
          </div>
        </>
      )}
    </div>
  );
}
