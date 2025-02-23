import { setupServer } from 'msw/node';
import { handlers } from './mocks/handlers';

// モックサーバーをセットアップ
export const server = setupServer(...handlers);
