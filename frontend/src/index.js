import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import ChatApp from "./components/MessageInterface";
import RegisterPage from "./components/RegisterPage";

// Routes
const appRouter = createBrowserRouter([
  {
    path: "/home",
    element: <ChatApp />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RouterProvider router={appRouter}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RouterProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
