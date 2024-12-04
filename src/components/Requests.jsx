import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";
import ConnectionCard from "./connectionCard";

const Requests = () => {
  const dispatch = useDispatch();
  const requestData = useSelector((store) => store.requests);
  console.log({ requestData });

  const fetchRequest = async () => {
    try {
      if (requestData) return;
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addRequest(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requestData) return;

  if (requestData && requestData.length == 0) {
    return (
      <div>
        <h2>No requests found</h2>
      </div>
    );
  }
  return (
    <div>
      <div className="flex justify-center">
        <h1>Requests</h1>
      </div>
      {requestData &&
        requestData.map((item) => {
          return (
            <ConnectionCard
              key={item._id}
              documentId={item._id}
              data={item.fromUserId}
              showButton={true}
            />
          );
        })}
    </div>
  );
};

export default Requests;
