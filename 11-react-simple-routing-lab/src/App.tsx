import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  LoaderFunctionArgs,
} from "react-router-dom";
import { Post } from "./model/post";
import ContactView from "./routes/ContanctView";
import ErrorView from "./routes/ErrorView";
import RootView from "./routes/RootView";
import { ApiClient, ApiClientImpl } from "./service/api-client";
import { IdType } from "./shared/common-types";

const API_CLIENT: ApiClient<IdType, Post> = new ApiClientImpl<IdType, Post>('posts');

export function postLoader({ params }: LoaderFunctionArgs ) {
  if (params.postId) {
    return API_CLIENT.findById(+params.postId);
  } else {
    throw new Error(`Invalid or missing post ID`);
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
