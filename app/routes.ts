import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/ArticleHome.tsx'),
  route(':articleId', 'routes/Article.tsx'),
] satisfies RouteConfig;
