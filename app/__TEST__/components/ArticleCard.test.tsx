import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ArticleCard from '~/components/ArticleCard';
import type { ArticleType } from '~/types/article';

// 記事のモックデータはコードの下に記載

test('タイトルが正しく表示される', () => {
  render(<ArticleCard {...mockArticle} />);
  const titleElement = screen.getByText('Article 1');
  expect(titleElement).toBeInTheDocument();
});

test('作成日が正しく表示される', () => {
  render(<ArticleCard {...mockArticle} />);
  const dateElement = screen.getByText('2025/3/4');
  expect(dateElement).toBeInTheDocument();
});

test('タグが正しく表示される', () => {
  render(<ArticleCard {...mockArticle} />);
  const tagElements = screen.getAllByText(/#/);
  expect(tagElements).toHaveLength(2);
  expect(tagElements[0]).toHaveTextContent('#JavaScript');
  expect(tagElements[1]).toHaveTextContent('#React');
});

test('本文がホバー時に表示される', async () => {
  render(<ArticleCard {...mockArticle} />);
  const bodyElement = screen.getByText('これはテスト本文です。');
  const bodyContainer = bodyElement.parentElement;

  // ホバー前には非表示
  expect(bodyContainer!.className).toContain('opacity-0');

  // ホバーをシミュレート
  await userEvent.hover(bodyContainer!);

  // ホバー後のクラスを確認
  expect(bodyContainer!.className).toContain('opacity-100');
});

test('いいねの数が正しく表示される', () => {
  render(<ArticleCard {...mockArticle} />);
  const likesElement = screen.getByText('10');
  expect(likesElement).toBeInTheDocument();
});

test('ユーザー情報が正しく表示される', () => {
  render(<ArticleCard {...mockArticle} />);
  const userIdElement = screen.getByText('user1');
  expect(userIdElement).toBeInTheDocument();
});

const mockArticle: ArticleType = {
  id: '1',
  title: 'Article 1',
  rendered_body: 'これはテスト本文です。',
  body: 'これはテスト本文です。',
  coediting: false,
  comments_count: 0,
  created_at: '2025-03-04T23:10:23+09:00',
  likes_count: 10,
  private: false,
  reactions_count: 0,
  stocks_count: 0,
  tags: [
    {
      name: 'JavaScript',
      versions: [],
    },
    {
      name: 'React',
      versions: [],
    },
  ],
  updated_at: '',
  url: '',
  user: {
    description: '',
    facebook_id: '',
    followees_count: 0,
    followers_count: 0,
    github_login_name: '',
    id: 'user1',
    items_count: 0,
    linkedin_id: '',
    location: '',
    name: 'User One',
    organization: '',
    permanent_id: 0,
    profile_image_url: 'https://example.com/user1.jpg',
    team_only: false,
    twitter_screen_name: '',
    website_url: '',
  },
};
