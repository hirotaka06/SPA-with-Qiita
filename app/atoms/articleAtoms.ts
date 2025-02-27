import { atom } from 'jotai';

// 検索キーワードを管理するAtom
export const keywordAtom = atom('');

// APIトークンを管理するAtom
export const apiTokenAtom = atom('');

// ページ番号を管理するAtom
export const pageAtom = atom(1);
