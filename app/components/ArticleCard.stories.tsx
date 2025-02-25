import type { Meta, StoryObj } from '@storybook/react';
import ArticleCard from './ArticleCard';

const meta: Meta<typeof ArticleCard> = {
  title: 'Components/ArticleCard',
  component: ArticleCard,
  argTypes: {
    created_at: { control: 'date' },
    title: { control: 'text' },
    tags: { control: 'object' },
    likes_count: { control: 'number' },
    user: { control: 'object' },
  },
};

export default meta;

type Story = StoryObj<typeof ArticleCard>;

export const Default: Story = {
  args: {
    created_at: new Date().toISOString(),
    title: 'サンプル記事のタイトル',
    tags: [
      { name: 'React', versions: ['17.0.2'] },
      { name: 'TypeScript', versions: ['4.4.3'] },
    ],
    likes_count: 42,
    user: {
      description: 'A sample user description',
      facebook_id: 'john.doe',
      followees_count: 100,
      followers_count: 200,
      github_login_name: 'johndoe',
      id: 'user123',
      items_count: 10,
      linkedin_id: 'john-doe',
      location: 'Tokyo, Japan',
      name: 'John Doe',
      organization: 'Sample Org',
      permanent_id: 123456,
      profile_image_url: 'https://via.placeholder.com/150',
      team_only: false,
      twitter_screen_name: 'johndoe',
      website_url: 'https://johndoe.com',
    },
  },
};
