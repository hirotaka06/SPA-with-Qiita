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

  const onSubmit = (data: FormData) => {
    setApiToken(data.token);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-3xl border border-gray-700 rounded-md"
    >
      <div className="relative flex-1 text-white">
        <Input
          type="text"
          {...register('token', {
            required: 'APIトークンは必須です',
            minLength: {
              value: 10,
              message: 'トークンは10文字以上である必要があります',
            },
          })}
          placeholder="APIトークンを入力..."
          className="h-12 rounded-l-md rounded-r-none bg-black px-4"
        />
        {errors.token && (
          <span className="text-red-700 text-sm">{errors.token.message}</span>
        )}
      </div>
      <Button
        type="submit"
        className="h-12 w-12 rounded-l-none rounded-r-md bg-white text-black hover:bg-gray-200"
      >
        <Check />
      </Button>
    </form>
  );
}
