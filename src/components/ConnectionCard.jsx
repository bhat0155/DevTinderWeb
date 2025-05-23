import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeRequest } from "../utils/requestSlice";
import { Link } from "react-router-dom";

const ConnectionCard = ({ data, showButton, documentId }) => {
  const { firstName, lastName, photoURL, skills, _id } = data;

  const dispatch = useDispatch();

  //id here is documentid
  const reviewRequest = async (status, id) => {
    try {
      const res = await axios.post(
        BASE_URL + `/connectionRequest/receive/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      console.log(res._id);
      dispatch(removeRequest(id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="card card-side bg-black text-white shadow-xl mb-5 mt-5 w-1/2">
        <figure>
          <img src={photoURL} alt="connection" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
          <p>{skills}</p>
          <Link to={"/chat/" + _id}>
            <button className="bg-purple-600 px-4 py-4 rounded rounded-lg text-black">Chat</button>
          </Link>
          {/* <div className="card-actions justify-end">
            <button className="btn btn-primary">Watch</button>
          </div> */}
          {showButton && (
            <div>
              <button
                onClick={() => reviewRequest("accepted", documentId)}
                className="btn mr-2 hover:bg-green-300 hover:text-black"
              >
                Accept
              </button>
              <button
                onClick={() => reviewRequest("rejected", documentId)}
                className="btn ml-2 hover:bg-red-400  hover:text-black"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConnectionCard;
