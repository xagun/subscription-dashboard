import "./App.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./views/Dashboard";
import UserList from "./views/UserList";
import NotFound from "./views/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/users",
        element: <UserList />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
