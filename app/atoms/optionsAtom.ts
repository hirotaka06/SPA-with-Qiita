import { atom } from 'jotai';

// 検索オプションを管理するAtom
export const optionsAtom = atom({
  user: undefined as string | undefined,
  minStocks: undefined as number | undefined,
  fromDate: undefined as string | undefined,
});
