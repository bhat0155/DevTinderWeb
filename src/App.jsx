import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";

const router = createBrowserRouter([{ path: "/", element: <Body />, children:[
  {
    path:"/login",
    element: <Login/>
  },
  {
    path:"profile",
    element: <Profile/>
  }
]}]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
