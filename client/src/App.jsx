import {Outlet, Route, RouterProvider, createBrowserRouter} from "react-router-dom"

//import pages
import Login from "./Pages/Login/Login"
import Home from "./Pages/Home/Home"
import Register from "./Pages/Register/Register"
import Write from "./Pages/Write/Write"
import Single from "./Pages/Single/Single"

//import componentes
import Footer from "./Components/Footer/Footer"
import Navbar from "./Components/Navbar/Navbar"

//quando vamos ter o mesmo componentes para varias pages, podemos passar eles diretamente no element ou criar um layout, ou puxar diretamente na pagina que vamos usar
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

//sistema de rotas
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: <Single />,
      },
      {
        path: "/write",
        element: <Write />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

//function app return
function App() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;