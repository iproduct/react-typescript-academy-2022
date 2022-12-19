import React from "react";
import {
  Await,
  createBrowserRouter,
  createRoutesFromElements,
  defer,
  Route,
  RouterProvider,
  useLoaderData,
} from "react-router-dom";

import {
  Fallback,
  Layout,
  homeLoader,
  Home,
  deferredLoader,
  DeferredPage,
  deferredChildLoader,
  deferredChildAction,
  DeferredChild,
  todosAction,
  todosLoader,
  TodosList,
  TodosBoundary,
  todoLoader,
  Todo,
  sleep,
  AwaitPage,
} from "./routes";
import "./index.css";


export const CustomDeferedData = () => {
  const data: any = useLoaderData();
  return <React.Suspense fallback={<p>Custom data loding ...</p>}>
    <Await resolve={data.data}>
      {(data) => (<h1>👋 : {data}</h1>)}
    </Await>
  </React.Suspense>
}

let router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index loader={homeLoader} element={<Home />} />
      <Route path="deferred" loader={deferredLoader} element={<DeferredPage />}>
        <Route
          path="child"
          loader={deferredChildLoader}
          action={deferredChildAction}
          element={<DeferredChild />}
        />
      </Route>
      <Route id="await" path="await" element={<AwaitPage />} />
      <Route
        path="long-load"
        loader={() => defer({ data: sleep(5000).then(() => 'Hi Async!!!') })}
        element={<CustomDeferedData />}
      />
      <Route
        path="todos"
        action={todosAction}
        loader={todosLoader}
        element={<TodosList />}
        errorElement={<TodosBoundary />}
      >
        <Route path=":id" loader={todoLoader} element={<Todo />} />
      </Route>
    </Route>
  )
);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

export default function App() {
  return <RouterProvider router={router} fallbackElement={<Fallback />} />;
}

