/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import SearchForm from '~/components/SearchForm';
import { keywordAtom, pageAtom } from '~/atoms/articleAtoms';
import { MemoryRouter, Route, Routes } from 'react-router';

const HydrateAtoms = ({
  initialValues,
  children,
}: {
  initialValues: any;
  children: any;
}) => {
  useHydrateAtoms(initialValues);
  return children;
};

const TestProvider = ({
  initialValues,
  children,
}: {
  initialValues: any;
  children: any;
}) => (
  <Provider>
    <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
  </Provider>
);

const createWrapper = () => {
  // eslint-disable-next-line react/prop-types
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <MemoryRouter initialEntries={['/1']}>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/:articleId" element={children} />
      </Routes>
    </MemoryRouter>
  );

  Wrapper.displayName = 'ProviderWrapper';

  return Wrapper;
};

const CustomProvider = () => {
  return (
    <TestProvider
      initialValues={[
        [keywordAtom, ''],
        [pageAtom, 1],
      ]}
    >
      <SearchForm />
    </TestProvider>
  );
};

test('SearchFormが初期状態で正しくレンダリングされる', () => {
  render(<CustomProvider />, { wrapper: createWrapper() });

  expect(screen.getByPlaceholderText('キーワード検索')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: '検索' })).toBeInTheDocument();
});

test('検索ボタンをクリックするとキーワードが検索され、記事一覧に遷移する', async () => {
  render(<CustomProvider />, { wrapper: createWrapper() });

  // Home Pageが表示されていないことを確認
  expect(screen.queryByText('Home Page')).not.toBeInTheDocument();

  const user = userEvent.setup();

  const searchInput = screen.getByPlaceholderText('キーワード検索');
  await user.type(searchInput, 'test');
  expect(searchInput).toHaveValue('test');

  const searchButton = screen.getByRole('button', { name: '検索' });
  await user.click(searchButton);

  // 検索ボタンを押すとnavigateが呼ばれた後、Home Pageに戻ることを確認
  await screen.findByText('Home Page');
  expect(screen.getByText('Home Page')).toBeInTheDocument();
});
