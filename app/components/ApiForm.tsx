import { useForm } from 'react-hook-form';
import { useSetAtom } from 'jotai';
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

  const setApiToken = useSetAtom(apiTokenAtom);

  const onSubmit = async (formData: FormData) => {
    setApiToken(formData.token);
    localStorage.setItem('apiToken', formData.token);
  };

  return (
    <div className="bg-[#222222] rounded-md p-4">
      <div className="absolute top-[-16px] right-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[16px] border-b-[#222222] mr-6"></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full rounded-md "
      >
        <label className="text-sm text-white">Qiita APIトークン</label>
        <Input
          id="api-token"
          type="password"
          {...register('token', {
            required: 'APIトークンは必須です',
            minLength: {
              value: 10,
              message: 'トークンは10文字以上である必要があります',
            },
          })}
          placeholder="APIトークンを入力..."
          className={`mt-2 h-12 ring-white/30 bg-black text-white ring  ${errors.token ? 'ring-red-600' : 'focus:ring-[#4593F8]'}`}
        />
        {errors.token && (
          <span className="text-red-600 text-sm mt-1">
            {errors.token.message}
          </span>
        )}
        <Button
          type="submit"
          className="px-2 mt-4 shadow-sm text-black border bg-white hover:bg-gray-200"
          aria-label="トークンを確認"
        >
          <Check />
        </Button>
      </form>
    </div>
  );
}
