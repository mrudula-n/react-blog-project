import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Home from '../pages/Home';
import Bloglist from '../pages/BlogList';
import PostDetail from '../pages/PostDetail';
import NewPost from '../pages/NewPost';
import EditPost from '../pages/EditPost';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'posts',
        children: [
          {
            index: true,
            element: <Bloglist />
          },
          {
            path: ':id',
            element: <PostDetail />
          },
          {
            path: 'new',
            element: <NewPost />
          },
          {
            path: ':id/edit',
            element: <EditPost />
          }
        ]
      },
      {
        path: 'profile',
        element: <Profile />
      }
    ]
  }
]);