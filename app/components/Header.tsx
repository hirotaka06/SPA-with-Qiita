import { Link } from 'react-router';
import SearchBar from '~/components/SerchForm';
import ApiForm from '~/components/ApiForm';

export default function Header() {
  return (
    <div className="flex justify-center items-center">
      <header className=" fixed top-4 w-[calc(100%-2rem)] z-50 bg-black border border-gray-900 rounded-xl">
        <div className="flex justify-between items-center px-6 py-4">
          {/* ロゴ */}
          <div className="flex items-center text-2xl ml-12">
            <Link to="/">
              <img src="/logo.svg" alt="logo" className="w-20 h-12" />
            </Link>
            <p className="text-sm text-gray-400 ml-4">|</p>
            <p className="text-sm text-gray-400 ml-4">Welcome To Cyber City</p>
          </div>
          <div className="flex items-center space-x-4 ">
            <h1 className="text-xl text-white opacity-50">{'<'}</h1>
            <h1 className="text-2xl text-white opacity-50">2</h1>
            <h1 className="text-4xl text-white ">3</h1>
            <h1 className="text-2xl text-white opacity-50">4</h1>
            <h1 className="text-xl text-white opacity-50">{'>'}</h1>
          </div>
          <div className="flex items-center space-x-4 mr-12">
            {/* 検索バー*/}
            <SearchBar />
            {/* APIトークン入力フォーム */}
            <ApiForm />
          </div>
        </div>
      </header>
    </div>
  );
}
