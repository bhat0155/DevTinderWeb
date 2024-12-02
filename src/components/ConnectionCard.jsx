import React from "react";

const ConnectionCard = ({data}) => {
    const {firstName, lastName, photoURL, skills}=data
    console.log({photoURL})

    console.log({lastName})
  return (
    <div className="flex justify-center">
      <div className="card card-side bg-black text-white shadow-xl mb-5 mt-5 w-1/2">
        <figure>
          <img
            src={photoURL}
            alt="connection"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
          <p>{skills}</p>
          {/* <div className="card-actions justify-end">
            <button className="btn btn-primary">Watch</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ConnectionCard;
