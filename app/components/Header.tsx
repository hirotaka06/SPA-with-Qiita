import { Link } from 'react-router';
import SearchForm from '~/components/SerchForm';
import ApiForm from '~/components/ApiForm';
import { useState, useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { Settings, X } from 'lucide-react';

export default function Header() {
  const [isApiFormVisible, setApiFormVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const toggleApiForm = () => {
    setApiFormVisible(!isApiFormVisible);
  };

  // スクロールしたらヘッダーに影をつける
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
            <div className="relative group">
              <Button
                onClick={toggleApiForm}
                className={`w-14 h-12 rounded-md border border-white/30 bg-black text-white hover:bg-[#222222] ${
                  isApiFormVisible ? 'border-red-600 text-red-600' : ''
                }`}
                aria-label="APIトークンを入力"
              >
                {isApiFormVisible ? (
                  <X />
                ) : (
                  <>
                    <Settings />
                    <span className="opacity-0 w-16 invisible rounded text-sm text-white bg-[#111111] py-1 top-14 -left-1 group-hover:visible group-hover:opacity-100 absolute">
                      設定
                    </span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>
      {/* APIフォームの表示 */}
      {isApiFormVisible && (
        <>
          <div className="fixed inset-0 bg-black opacity-70 z-40"></div>
          <div className="fixed top-28 w-80 right-3 sm:right-5 md:right-8 lg:right-12 z-50 ">
            <ApiForm />
          </div>
        </>
      )}
    </div>
  );
}
