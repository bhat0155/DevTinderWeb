import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import Usercard from "./Usercard";
import addUser from "../utils/userSlice";
import Toast from "./Toast";

const EditProfile = ({ user }) => {
  console.log(user);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [skills, setSkills] = useState(user.skills);
  const [gender, setGender] = useState(user.gender);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSave = async () => {
    console.log("handlesave");
    // clear error
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoURL, skills, gender },
        { withCredentials: true }
      );
      console.log(res);
      console.log(res?.data?.data);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (err) {
      console.log(err.message);
      if (err.status == 400) {
        setError("Please provide valid gender: male, female or others");
      }
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex justify-center">
        <div className="border border-blue-300 m-auto w-80 mt-20 p-9 m-3 mr-4">
          <label className="form-control w-full max-w-xs ">
            <div className="label">
              <span className="label-text">First Name</span>
            </div>
            <input
              value={firstName}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              onChange={(ev) => setFirstName(ev.target.value)}
            />
          </label>

          {/* lastname */}
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

          {/* photoURL */}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">PhotoURL </span>
            </div>
            <input
              value={photoURL}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              onChange={(ev) => setPhotoURL(ev.target.value)}
            />
          </label>
          <label className="form-control w-full max-w-xs ">
            <div className="label">
              <span className="label-text">Skills</span>
            </div>
            <input
              value={skills}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              onChange={(ev) => setSkills(ev.target.value)}
            />
          </label>
          <label className="form-control w-full max-w-xs ">
            <div className="label">
              <span className="label-text">Gender</span>
            </div>
            <input
              value={gender}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              onChange={(ev) => setGender(ev.target.value)}
            />
          </label>
          <p className="text-red-600 mt-4 ml-16">{error}</p>
          <button
            className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg mt-10 ml-20 bg-blue-800"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
        {/* we are sending the updated values as props */}
        {user && (
          <Usercard data={{ firstName, lastName, photoURL, skills, gender }} />
        )}
        {showToast && <Toast />}
      </div>
    </div>
  );
};

export default EditProfile;
