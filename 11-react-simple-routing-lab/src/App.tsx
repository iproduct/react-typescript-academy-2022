import React, { Children } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  LoaderFunctionArgs,
  ActionFunctionArgs,
  redirect,
} from "react-router-dom";
import { Post } from "./model/post";
import ContactView, { Favorite } from "./routes/ContanctView";
import ErrorView from "./routes/ErrorView";
import { PostsView } from "./routes/PostsView";
import PostView from "./routes/PostView";
import RootView from "./routes/RootView";
import { ApiClient, ApiClientImpl, PostsApiClient, PostsApiClientImpl } from "./service/api-client";
import { IdType } from "./shared/common-types";

const API_CLIENT: PostsApiClient = new PostsApiClientImpl();

export async function postsLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  if (q) {
    return API_CLIENT.findByTitleLike(q);
  } else {
    return API_CLIENT.findAll();
  }
}

export function postLoader({ params }: LoaderFunctionArgs ) {
  if (params.postId) {
    return API_CLIENT.findById(+params.postId);
  } else {
    throw new Error(`Invalid or missing post ID`);
  }
}

export const postAction = async ({request, params}: ActionFunctionArgs) => {
  if(request.method === 'DELETE') {
    params.postId && await API_CLIENT.deleteById(+params.postId);
    return redirect('/posts');
  } else if(request.method === 'PATCH') {
    let formData = await request.formData();
    const favorite = formData.get('favorite');
    console.log(`Favorite Post[${params.postId}]: ${favorite}`);
    if(favorite !== null && params.postId) {
      return API_CLIENT.patchById(+params.postId, {favorite: favorite === 'true'? false: true })
    }
  } else {
    throw new Error(`Unhandled form method: ${request.method}`)
  }
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootView />,
    errorElement: <ErrorView />,
    children: [
      {
        errorElement: <ErrorView />,
        children: [
          {
            index: true,
            element: <div>Home Page</div>,
          },
          {
            path: "posts",
            loader: postsLoader,
            element: <PostsView/>,
            children: [
              {
                path: ":postId",
                loader: postLoader,
                action: postAction,
                element: <PostView />
              }
            ]
          },
          {
            path: "contacts/:contactId",
            element: <ContactView />,
          },
          {
            path: "about",
            element: <div>About Page</div>,
          },
          {
            path: "*",
            element: <ErrorView />,
          }
        ]
      },
    ]
  },

]);


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
