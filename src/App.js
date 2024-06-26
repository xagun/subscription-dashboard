import "./App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

const Layout = () => {
  return (
    <div className="main-layout">
      <Sidebar />

      <div className="dashboard-layout">
        <Outlet />
      </div>
    </div>
  );
};

const Sidebar = () => {
  return <div>Sidebar</div>;
};

const Dashboard = () => {
  return <div className="">Dashboard</div>;
};

const UserList = () => {
  return <div className="">User List</div>;
};

const NotFound = () => {
  return <div className="">Not found page</div>;
};

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
