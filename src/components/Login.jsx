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
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, email, password },
        { withCredentials: true }
      );
      console.log(res.data)
      dispatch(addUser(res?.data?.data))
      navigate("/profile")
    } catch (err) {
      console.log(err);
    }
  };

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
          <h1 className="flex justify-center">
            {isLogin ? "Login" : "Signup"}
          </h1>
          {!isLogin && (
            <>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">First Name </span>
                </div>
                <input
                  value={firstName}
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(ev) => setFirstName(ev.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Last Name </span>
                </div>
                <input
                  value={lastName}
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(ev) => setLastName(ev.target.value)}
                />
              </label>
            </>
          )}
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
            type="password"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </label>
        <p className="text-red-600 mt-4 ml-16">{error}</p>
        <button
          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg mt-10 ml-20 bg-blue-800"
          onClick={isLogin ? handleClick : handleSignup}
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
        <p
          onClick={() => setIsLogin(!isLogin)}
          className="cursor-pointer my-8 ml-4"
        >
          {isLogin
            ? "New User? Please sign up"
            : "Existing User? Please log in"}
        </p>
      </div>
    </div>
  );
};

export default Login;
