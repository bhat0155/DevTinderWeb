import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("batunga@gmail.com");
  const [password, setPassword] = useState("Batunga@003");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleClick = async () => {
    try {
      const fetchData = await axios.post(
        `${BASE_URL}/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(fetchData.data));
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err?.response?.data);
      navigate("/login");
    }
  };

  return (
    <div>
      <div className="border border-blue-300 m-auto w-80 mt-20 p-7">
        <label className="form-control w-full max-w-xs ">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            value={email}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            onChange={(ev) => setEmail(ev.target.value)}
          />
        </label>

        {/* password */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Password </span>
          </div>
          <input
            value={password}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </label>
        <p className="text-red-600 mt-4 ml-16">{error}</p>
        <button
          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg mt-10 ml-20 bg-blue-800"
          onClick={handleClick}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
