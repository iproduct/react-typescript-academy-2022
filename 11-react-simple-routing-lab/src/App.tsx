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
import RootView from "./routes/RootView";

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
