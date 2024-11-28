import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("batunga@gmail.com");
  const [password, setPassword] = useState("Batunga@003");
  const dispatch=useDispatch()
  const navigate= useNavigate()

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

      console.log(fetchData.data);
      dispatch(addUser(fetchData.data))
      navigate("/feed")

    } catch (err) {
      console.log(err);
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
