import { useForm } from 'react-hook-form';
import { useSetAtom } from 'jotai';
import { keywordAtom, pageAtom } from '~/atoms/articleAtoms';
import { Search } from 'lucide-react';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { useNavigate } from 'react-router';

interface SearchFormData {
  keyword: string;
}

export default function SearchForm() {
  const { register, handleSubmit } = useForm<SearchFormData>();
  const setKeyword = useSetAtom(keywordAtom);
  const setPage = useSetAtom(pageAtom);
  const navigate = useNavigate();

  const onSubmit = (data: SearchFormData) => {
    setKeyword(data.keyword);
    setPage(1);
    navigate('/');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-3xl border border-white/30 rounded-md mx-2 ring focus-within:ring-[#4593F8]"
    >
      <div className="relative flex-1 text-white">
        <Input
          type="search"
          {...register('keyword')}
          placeholder="キーワード検索"
          className="h-12 rounded-l-md rounded-r-none bg-black"
        />
      </div>
      <div className="relative group">
        <Button
          type="submit"
          size="icon"
          className="h-12 w-12 rounded-l-none rounded-r-md bg-black text-white hover:bg-[#222222]"
        >
          <Search className="h-5 w-5" />
          <span className="opacity-0 w-16 invisible rounded text-sm text-white bg-[#111111] py-1 top-14 -left-2 group-hover:visible group-hover:opacity-100 absolute">
            検索
          </span>
        </Button>
      </div>
    </form>
  );
}
