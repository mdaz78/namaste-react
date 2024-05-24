import { RouterProvider, createBrowserRouter } from "react-router-dom";
import About from "./pages/About";
import ErrorPage from "./pages/Error";
import Home from "./pages/Home";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/about",
    element: <About />,
    errorElement: <ErrorPage />,
  },
]);

const App = () => {
  return <RouterProvider router={appRouter} />;
};

export default App;
