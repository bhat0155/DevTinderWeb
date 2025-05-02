import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const userData = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchUser = async () => {
    try {
      if (userData) return; // if user exist, do not make another api call
      const data = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });

      dispatch(addUser(data.data));
    } catch (err) {
      navigate("/login");

      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Body;
