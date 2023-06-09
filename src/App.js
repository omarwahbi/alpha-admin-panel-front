import LogIn from "./pages/LogIn";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Testimnials from "./pages/Testimnials";
import AboutUs from "./pages/AboutUs";
import Projects from "./pages/Projects";
import Project from "./pages/Project";
import Logos from "./pages/Logos";
import Categories from "./pages/Categories";
import ContactUs from "./pages/ContactUs";
import api from "./Components/Api";
// api.defaults.withCredentials = true;
import Cookies from "js-cookie";
let accessToken = Cookies.get("access_token");
api.defaults.headers.common["Authorization"] = accessToken;

const router = createBrowserRouter([
  {
    path: "/",
    element: <LogIn />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/testimonials",
    element: <Testimnials />,
  },
  {
    path: "/project/:id",
    element: <Project />,
  },
  {
    path: "/logos",
    element: <Logos />,
  },
  {
    path: "/aboutUs",
    element: <AboutUs />,
  },
  {
    path: "/projects",
    element: <Projects />,
  },
  {
    path: "/contactUs",
    element: <ContactUs />,
  },
  {
    path: "/categories",
    element: <Categories />,
  },
]);
function App() {
  // const { accessToken } = useContext(AuthContext);
  // api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  return <RouterProvider router={router} />;
}

export default App;
