import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeFeed } from "../utils/feedSlice";

const Usercard = (props) => {
  console.log(props);
  const showBtn = props.showButton;
  const { _id, firstName, lastName, skills, photoURL, gender } = props.data;
  const dispatch = useDispatch();

  const handleClick = async (status, id) => {
    console.log("clicked");
    // make a fetchCall to change the backend and dispatch to change the feed.
    try {
      const res = await axios.post(
        BASE_URL + `/connectionRequest/${status}/${id}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeFeed(id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="card bg-base-300 w-96 shadow-xl ">
        <figure>
          <img className="h-80 mt-16" src={photoURL} alt="photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
          <span>Skills: {skills}</span>
          <span>Gender: {gender}</span>
          <div className="card-actions justify-center mt-14">
            {showBtn && (
              <div>
                <button
                  onClick={() => handleClick("ignored", _id)}
                  className="btn btn-primary bg-red-400 border border-red-400 mx-2"
                >
                  Ignore
                </button>
                <button
                  onClick={() => handleClick("interested", _id)}
                  className="btn btn-primary bg-green-400  border-green-400 mx-2"
                >
                  Interested
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usercard;
