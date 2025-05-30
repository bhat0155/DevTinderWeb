import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
import Feed from "./components/Feed";
import Connection from "./components/Connection";
import Requests from "./components/Requests";
import Premium from "./components/Premium";
import Chat from "./components/Chat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/connections",
        element: <Connection />,
      },
      {
        path: "/requests",
        element: <Requests />,
      },
      {
        path: "/premium",
        element: <Premium />,
      },
      {
        path: "/chat/:targetUser",
        element: <Chat />,
      },
      {
        path: "/",
        element: <Feed />,
      },
     
 
    ],
  },
]);

function App() {
  return (
    <>
      <Provider store={appStore}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
