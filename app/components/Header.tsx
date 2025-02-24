import { Link } from 'react-router';

export default function Header() {
  return (
    <header className="bg-black text-white p-4 fixed top-0 left-0 w-full z-50 border-b border-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        {/* ロゴ */}
        <div className="text-2xl font-bold">
          <Link to="/">タイトル未定</Link>
        </div>
      </div>
    </header>
  );
}
