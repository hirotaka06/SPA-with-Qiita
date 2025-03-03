import { useForm } from 'react-hook-form';
import { useSetAtom } from 'jotai';
import { apiTokenAtom } from '~/atoms/articleAtoms';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Check } from 'lucide-react';
import { Label } from '~/components/ui/label';

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
    <div className="mt-6">
      <Label className="text-sm text-white flex items-center mx-1 mb-1">
        Qiita APIトークン
        <span className="flex-grow border-t border-white/60"></span>
      </Label>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col mx-1 rounded-md justify-center"
      >
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
          className={`mt-2 h-12 ring-white/30 bg-background/50 hover:bg-background/90 text-white ring  ${errors.token ? 'ring-red-600' : 'focus:ring-[#4593F8]'}`}
        />
        {errors.token && (
          <span className="text-red-600 text-sm mt-1">
            {errors.token.message}
          </span>
        )}
        <Button
          type="submit"
          className="px-2 mt-4 text-black border bg-white hover:bg-white/80 shadow-white/30 shadow-lg"
          aria-label="トークンを確認"
        >
          <Check />
          APIトークンを登録
        </Button>
      </form>
    </div>
  );
}
