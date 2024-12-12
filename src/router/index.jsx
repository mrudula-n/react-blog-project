import { createBrowserRouter } from 'react-router-dom'; // Import createBrowserRouter for creating router configuration.
import Layout from '../components/Layout/Layout'; // Import Layout component for shared layout.
import Home from '../pages/Home'; // Import Home page component.
import Bloglist from '../pages/BlogList'; // Import BlogList page component.
import PostDetail from '../pages/PostDetail'; // Import PostDetail page component.
import NewPost from '../pages/NewPost'; // Import NewPost page component.
import EditPost from '../pages/EditPost'; // Import EditPost page component.
import Profile from '../pages/Profile'; // Import Profile page component.
import NotFound from '../pages/NotFound'; // Import NotFound page component for handling errors.

export const router = createBrowserRouter([ // Create a router instance using createBrowserRouter.
  {  //define the root route
    path: '/', // Root path of the application.
    element: <Layout />, // Layout component to be rendered for all routes under this path.
    errorElement: <NotFound />, // Component to be rendered when an error occurs during routing.
    children: [ //nested routes
      {   //define the home route
        index: true, // Render this component when the path is exactly '/'.
        element: <Home /> // Home component to be rendered.
      },
      {  //define the posts route
        path: 'posts', //path for posts route
        children: [  //nested routes under posts
          {   
            index: true, // Render this component when the path is exactly '/posts'.
            element: <Bloglist /> // BlogList component to be rendered.
          },
          {   //define a dynamic route to handle individual post details
            path: ':id', // Dynamic path segment for post ID.
            element: <PostDetail /> // PostDetail component to be rendered.
          },
          {    //define the route to create a new post
            path: 'new', // Path for creating a new post.
            element: <NewPost /> // NewPost component to be rendered.
          },
          {    //define a dynamic route to handle editing of a post
            path: ':id/edit',  // Dynamic path segment for editing a post by ID.
            element: <EditPost /> // EditPost component to be rendered.
          }
        ]
      },
      {  //define the route for profile page
        path: 'profile', //path for profile
        element: <Profile />  // Profile component to be rendered.
      }
    ]
  }
]); //export the router configuration
