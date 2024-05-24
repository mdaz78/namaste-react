import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import About from "./pages/About";
import ErrorPage from "./pages/Error";
import Home from "./pages/Home";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/About",
        element: <About />,
      },
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);
