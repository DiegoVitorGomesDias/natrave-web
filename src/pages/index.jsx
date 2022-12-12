import 
{
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

import { Home } from "./Home"
import { Login, Cadastro } from "./Login"
import { Dashboard } from "./Dashboard"
import { Profile } from "./Profile"

const router = createBrowserRouter
([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cadastro",
    element: <Cadastro />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/:username",
    element: <Profile />,
  },
]);

export const Router = () => <RouterProvider router={router} />;