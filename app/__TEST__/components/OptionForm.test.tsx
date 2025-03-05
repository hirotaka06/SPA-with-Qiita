/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen } from '@testing-library/react';
import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import OptionForm from '~/components/OptionForm';
import { optionsAtom } from '~/atoms/optionsAtom';
import { pageAtom } from '~/atoms/articleAtoms';
import userEvent from '@testing-library/user-event';

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

const CustomProvider = () => {
  return (
    <TestProvider
      initialValues={[
        [optionsAtom, { user: '', minStocks: '', fromDate: '' }],
        [pageAtom, 1],
      ]}
    >
      <OptionForm />
    </TestProvider>
  );
};

test('OptionFormが初期状態で正しくレンダリングされる', () => {
  render(<CustomProvider />);

  expect(screen.getByText('検索オプション')).toBeInTheDocument();
  expect(screen.getByText('Save')).toBeInTheDocument();
  expect(screen.getByText('Reset')).toBeInTheDocument();

  expect(screen.getByLabelText('ユーザー名入力フィールド')).toHaveValue('');
  expect(screen.getByLabelText('最低ストック数入力フィールド')).toHaveValue(
    null,
  );
  const dateInput = screen.getByText('日付を選択');
  expect(dateInput).toBeInTheDocument();
});

test('入力フィールドが正しく動作する', async () => {
  render(<CustomProvider />);

  const user = userEvent.setup();

  const userNameInputElement =
    screen.getByLabelText('ユーザー名入力フィールド');
  await user.type(userNameInputElement, 'testuser');
  expect(userNameInputElement).toHaveValue('testuser');

  const minStocksInputElement =
    screen.getByLabelText('最低ストック数入力フィールド');
  await user.type(minStocksInputElement, '10');
  expect(minStocksInputElement).toHaveValue(10);
});
