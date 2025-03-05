import { useAtom, useSetAtom } from 'jotai';
import { optionsAtom } from '~/atoms/optionsAtom';
import { pageAtom } from '~/atoms/articleAtoms';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { useState } from 'react';
import { CardContent } from '~/components/ui/card';
import { Calendar, User, Package2, Save, RefreshCw } from 'lucide-react';
import { Label } from '~/components/ui/label';
import { DatePicker } from './DatePicker';

export default function OptionForm() {
  const [options, setOptions] = useAtom(optionsAtom);
  const setPage = useSetAtom(pageAtom);

  const initialFormValues = {
    user: options.user || '',
    minStocks: options.minStocks || '',
    fromDate: options.fromDate ? new Date(options.fromDate) : undefined,
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setOptions({
      user: formValues.user || undefined,
      minStocks: formValues.minStocks
        ? parseInt(formValues.minStocks.toString(), 10)
        : undefined,
      fromDate: formValues.fromDate
        ? formValues.fromDate.toISOString()
        : undefined,
    });
    setPage(1);
  };

  const handleReset = () => {
    setFormValues(initialFormValues);
    setOptions({
      user: undefined,
      minStocks: undefined,
      fromDate: undefined,
    });
    setPage(1);
  };

  return (
    <div className="text-white mt-1">
      <Label className="text-md text-white flex items-center mx-1 mb-2">
        検索オプション
        <span className="flex-grow border-t border-white/60"></span>
      </Label>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-3 -mx-5">
          <div className="flex items-center justify-between space-x-4">
            <Label
              htmlFor="username"
              className="text-sm font-medium flex items-center gap-1.5 whitespace-nowrap"
            >
              <User className="h-4 w-4" />
              ユーザー名
            </Label>
            <div className="relative flex-grow">
              <Input
                id="username"
                value={formValues.user}
                onChange={(e) =>
                  setFormValues({ ...formValues, user: e.target.value })
                }
                className="pl-3 h-11 hover:bg-background/90 bg-background/50 ring ring-white/30 focus-visible:ring-[#4593F8]"
                aria-label="ユーザー名入力フィールド"
                placeholder="@の続きから入力..."
              />
            </div>
          </div>

          <div className="flex items-center justify-between space-x-4">
            <Label
              htmlFor="minStock"
              className="text-sm font-medium flex items-center gap-1.5 whitespace-nowrap"
            >
              <Package2 className="h-4 w-4" />
              最低ストック数
            </Label>
            <div className="relative">
              <Input
                id="minStock"
                type="number"
                min={0}
                value={formValues.minStocks}
                onChange={(e) =>
                  setFormValues({ ...formValues, minStocks: e.target.value })
                }
                className="pl-3 h-11 hover:bg-background/90 bg-background/50 ring ring-white/30 focus-visible:ring-[#4593F8]"
                aria-label="最低ストック数入力フィールド"
              />
            </div>
          </div>

          <div className="flex items-center justify-between space-x-4">
            <Label
              htmlFor="postDate"
              className="text-sm font-medium flex items-center gap-1.5 whitespace-nowrap"
            >
              <Calendar className="h-4 w-4" />
              投稿日
            </Label>
            <DatePicker
              date={formValues.fromDate}
              setDate={(date) =>
                setFormValues({ ...formValues, fromDate: date })
              }
              aria-label="投稿日の選択"
            />
          </div>
          <p className="text-sm text-white/60 font-medium">
            (＊指定された日付以降の記事を表示します)
          </p>
        </CardContent>
        <div className="flex space-x-2 mt-4 mx-1">
          <Button
            type="submit"
            className="font-normal p-1 rounded-md flex-grow border border-[#22aa6d]/50 shadow-[#22aa6d]/50 shadow-lg bg-[#22aa6d] hover:bg-[#22aa6d]/80"
            aria-label="保存ボタン"
          >
            <Save className="mr-1 h-5 w-5 text-white/70" />
            Save
          </Button>
          <Button
            type="button"
            onClick={handleReset}
            className="font-normal p-1 rounded-md flex-grow border border-[#8a49d0]/50 shadow-[#8a49d0]/50 shadow-lg bg-[#8a49d0] hover:bg-[#8a49d0]/80"
            aria-label="リセットボタン"
          >
            <RefreshCw className="mr-1 h-5 w-5 text-white/70" />
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
}
