import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import ContactView from "./routes/ContanctView";
import ErrorView from "./routes/ErrorView";
import Root from "./routes/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
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
