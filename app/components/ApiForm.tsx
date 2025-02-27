import { useForm } from 'react-hook-form';
import { useAtom } from 'jotai';
import { apiTokenAtom } from '~/atoms/articleAtoms';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Check } from 'lucide-react';

interface FormData {
  token: string;
}

export default function ApiForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [, setApiToken] = useAtom(apiTokenAtom);

  const onSubmit = async (formData: FormData) => {
    setApiToken(formData.token);
  };

  return (
    <div className="bg-white rounded-xl p-4">
      <div className="absolute top-[-10px] right-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-white mr-12"></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full rounded-md "
      >
        <label className="text-sm">Qiita APIトークン</label>
        <Input
          id="api-token"
          type="text"
          {...register('token', {
            required: 'APIトークンは必須です',
            minLength: {
              value: 10,
              message: 'トークンは10文字以上である必要があります',
            },
          })}
          placeholder="APIトークンを入力..."
          className={`mt-1 border bg-black text-white ring-2 ${errors.token ? 'ring-red-700' : 'focus:ring-blue-700'}`}
        />
        {errors.token && (
          <span className="text-red-700 text-sm mt-1">
            {errors.token.message}
          </span>
        )}
        <Button
          type="submit"
          className="mt-2 shadow-sm text-black border bg-white hover:bg-gray-200"
        >
          <Check />
        </Button>
      </form>
    </div>
  );
}
