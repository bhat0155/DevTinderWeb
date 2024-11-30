import React from "react";

const Usercard = (props) => {
  const { firstName, lastName, skills, photoURL } = props.data;

  return (
    <div className="flex justify-center">
      <div className="card bg-base-300 w-96 shadow-xl ">
        <figure>
          <img src={photoURL} alt="photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName}</h2>
          <p>{skills}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary bg-red-400 border border-red-400">Ignore</button>
            <button className="btn btn-primary bg-green-400  border-green-400">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usercard;
