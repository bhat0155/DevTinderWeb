import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import ConnectionCard from "./connectionCard";

const Connections = () => {
  const dispatch = useDispatch();
  const connectionsData = useSelector((store) => store.connections);
  console.log({ connectionsData });
  const fetchConnections = async () => {
    try {
      if (connectionsData) return;

      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res?.data?.data);
      dispatch(addConnection(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  {
    connectionsData && connectionsData.length == 0 && (
      <div>No connections found</div>
    );
  }

  return (
    <div>
      <div className="flex justify-center">
        <h1>Connections</h1>
      </div>
      {connectionsData &&
        connectionsData.map((item) => {
          return <ConnectionCard key={item._id} data={item} />;
        })}
    </div>
  );
};

export default Connections;
