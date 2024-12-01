import React from "react";

const Usercard = (props) => {
  console.log(props)
  const { firstName, lastName, skills, photoURL, gender } = props.data;

  return (
    <div className="flex justify-center">
      <div className="card bg-base-300 w-96 shadow-xl ">
        <figure>
          <img className="h-80 mt-16"  src={photoURL} alt="photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
          <span>Skills: {skills}</span>
          <span>Gender: {gender}</span>
          <div className="card-actions justify-center mt-14">
            <button className="btn btn-primary bg-red-400 border border-red-400">
              Ignore
            </button>
            <button className="btn btn-primary bg-green-400  border-green-400">
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usercard;
