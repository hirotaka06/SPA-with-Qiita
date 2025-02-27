import { useForm } from 'react-hook-form';
import { useAtom } from 'jotai';
import { keywordAtom, pageAtom } from '~/atoms/articleAtoms';
import { Search } from 'lucide-react';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';

interface SearchFormData {
  keyword: string;
}

export default function SearchForm() {
  const { register, handleSubmit } = useForm<SearchFormData>();
  const [, setKeyword] = useAtom(keywordAtom);
  const [, setPage] = useAtom(pageAtom);

  const onSubmit = (data: SearchFormData) => {
    setKeyword(data.keyword);
    setPage(1);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-3xl border border-gray-800 rounded-md mx-2"
    >
      <div className="relative flex-1 text-white">
        <Input
          type="search"
          {...register('keyword')}
          placeholder="キーワード検索"
          className="h-12 rounded-l-md rounded-r-none bg-black px-4"
        />
      </div>
      <Button
        type="submit"
        size="icon"
        className="h-12 w-12 rounded-l-none rounded-r-md bg-white text-black hover:bg-gray-200"
      >
        <Search className="h-5 w-5" />
        <span className="sr-only">検索</span>
      </Button>
    </form>
  );
}
