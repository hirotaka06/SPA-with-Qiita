import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router';
import Header from '~/components/Header';
import userEvent from '@testing-library/user-event';
import { act } from 'react';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  // eslint-disable-next-line react/prop-types
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  );

  Wrapper.displayName = 'QueryClientProviderWrapper';

  return Wrapper;
};

test('Headerにロゴが表示されている', () => {
  render(<Header />, { wrapper: createWrapper() });

  const logo = screen.getByAltText('logo');
  expect(logo).toBeInTheDocument();
});

test('Headerに設定ボタンが表示されている', () => {
  render(<Header />, { wrapper: createWrapper() });

  const settingsButton = screen.getByRole('button', {
    name: '設定フォームを表示',
  });
  expect(settingsButton).toBeInTheDocument();
});

test('設定ボタンを押したら、検索オプションが表示される', async () => {
  render(<Header />, { wrapper: createWrapper() });

  const settingsButton = screen.getByRole('button', {
    name: '設定フォームを表示',
  });
  await userEvent.click(settingsButton);

  const searchOptions = screen.getByText('検索オプション');
  expect(searchOptions).toBeInTheDocument();
});

test('設定ボタンをクリックするとAPIトークン入力フォームが表示される', async () => {
  render(<Header />, { wrapper: createWrapper() });

  const settingsButton = screen.getByRole('button', {
    name: '設定フォームを表示',
  });
  await userEvent.click(settingsButton);

  const apiForm = screen.getByPlaceholderText('APIトークンを入力...');
  expect(apiForm).toBeVisible();
});

test('スクロール時にヘッダーのスタイルが変更される', () => {
  render(<Header />, { wrapper: createWrapper() });

  // スクロール前のスタイルを確認
  const header = screen.getByRole('navigation');
  expect(header).not.toHaveClass('shadow-[0_4px_18px_rgba(255,255,255,0.12)]');

  // actでスクロールイベントをラップ
  act(() => {
    window.scrollY = 100;
    window.dispatchEvent(new Event('scroll'));
  });

  // スクロール後のスタイルを確認
  expect(header).toHaveClass('shadow-[0_4px_18px_rgba(255,255,255,0.12)]');
});

test('検索フォームが正しく表示される', () => {
  render(<Header />, { wrapper: createWrapper() });

  const searchInput = screen.getByPlaceholderText('キーワード検索');
  expect(searchInput).toBeInTheDocument();
});

test('設定ボタンをクリックするとスタイルが変更される', async () => {
  render(<Header />, { wrapper: createWrapper() });

  const settingsButton = screen.getByRole('button', {
    name: '設定フォームを表示',
  });
  await userEvent.click(settingsButton);

  // ボタンのスタイルが変更されていることを確認
  expect(settingsButton).toHaveClass('border-[#4593F8]');
  expect(settingsButton).toHaveClass('text-[#4593F8]');
});
