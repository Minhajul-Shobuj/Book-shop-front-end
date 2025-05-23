import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import AllBooks from "../pages/AllBooks";
import Register from "../pages/Register";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import AddBook from "../components/Admin/DashBoard/AddBook";
import AdminDashBoard from "../components/Admin/DashBoard/AdminDashBoard";
import ManageUser from "../components/Admin/DashBoard/ManageUser";
import BookDetails from "../pages/BookDetails";
import Cart from "../pages/Cart";
import ManageOrder from "../components/Admin/DashBoard/ManageOrder";
import UpdateBook from "../components/Admin/DashBoard/UpdateBook";
import MyProfile from "../pages/MyProfile";
import UserDashBoard from "../pages/UserDashBoard";
import AdminOrders from "../components/Admin/DashBoard/AdminOrders";
import NewRelease from "../pages/NewRelease";
import SearchResultsPage from "../pages/SearchResultPage";
import AllCategories from "../pages/AllCategories";
import BookByCategory from "../pages/BookByCategory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/books",
    element: <AllBooks />,
  },
  {
    path: "/search-results",
    element: <SearchResultsPage />,
  },
  {
    path: "/new-books",
    element: <NewRelease />,
  },
  {
    path: "/categories",
    element: <AllCategories />,
  },
  {
    path: "/categories/:category",
    element: <BookByCategory />,
  },
  {
    path: "/details/:bookId",
    element: <BookDetails />,
  },
  {
    path: "/my-cart",
    element: <ProtectedRoute roles={["user", "admin"]} children={<Cart />} />,
  },
  {
    path: "/my-profile",
    element: (
      <ProtectedRoute roles={["user", "admin"]} children={<MyProfile />} />
    ),
  },
  {
    path: "dashboard/user",
    element: <ProtectedRoute roles={["user"]} children={<UserDashBoard />} />,
  },

  {
    path: "dashboard/admin",
    element: <ProtectedRoute roles={["admin"]} children={<AdminDashBoard />} />,
    children: [
      {
        path: "add-book",
        element: <ProtectedRoute roles={["admin"]} children={<AddBook />} />,
      },
      {
        path: "update-book",
        element: <ProtectedRoute roles={["admin"]} children={<UpdateBook />} />,
      },
      {
        path: "manage-users",
        element: <ProtectedRoute roles={["admin"]} children={<ManageUser />} />,
      },
      {
        path: "manage-orders",
        element: (
          <ProtectedRoute roles={["admin"]} children={<ManageOrder />} />
        ),
      },
      {
        path: "admin-orders",
        element: (
          <ProtectedRoute roles={["admin"]} children={<AdminOrders />} />
        ),
      },
    ],
  },
]);
export default router;
