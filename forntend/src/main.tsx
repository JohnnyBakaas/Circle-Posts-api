import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import Root from "./routes/Root.tsx";
import ErrorPage from "./routes/error-page.tsx";
import LoggInn from "./routes/LoggInn.tsx";
import Global from "./components/global/Global.tsx";
import Friends from "./components/friends/friends.tsx";
import Circle from "./components/circle/Circle.tsx";
import NewCircle from "./components/newCircle/NewCircle.tsx";
import MessageContainter from "./components/messageContainter/MessageContainter.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <Global /> },
      { path: "/friends", element: <Friends /> },
      { path: "/circle/:circleId", element: <Circle /> },
      { path: "/newCircle", element: <NewCircle /> },
      { path: "/message", element: <MessageContainter /> },
    ],
  },
  {
    path: "/LoggInn",
    element: <LoggInn />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
