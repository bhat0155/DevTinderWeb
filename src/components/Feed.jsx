import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import Usercard from "./Usercard";

const Feed = () => {
  const feedData = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const fetchFeed = async () => {
    if (feedData) return;
    const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });

    dispatch(addFeed(res?.data?.data));
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if (!feedData) return;
  if (feedData.length < 1)
    return (
      <div className="flex justify-center">
        <h1>Refresh to load more users</h1>
      </div>
    );

  return (
    <div>{feedData && <Usercard showButton={true} data={feedData[0]} />}</div>
  );
};

export default Feed;
