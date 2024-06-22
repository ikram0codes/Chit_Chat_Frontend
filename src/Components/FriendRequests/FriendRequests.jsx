import React, { useEffect, useState } from "react";
import styles from "./FriendRequests.module.css";
import { useDispatch } from "react-redux";
import { acceptRequest } from "../../api";
import { toast } from "react-hot-toast";
import BLoader from "../BLoader/BLoader";

const FriendRequests = ({ user }) => {
  const dispatch = useDispatch();
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setFriendRequests(user.friendRequests);
    setLoading(false);
  }, []);
  return loading ? (
    <BLoader />
  ) : (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1>Requests</h1>
        <span>{friendRequests.length}</span>
      </div>
      <div className={styles.requests}>
        {friendRequests.length === 0 ? (
          <div className="alt">
            <h1>No Friend Requests!</h1>
          </div>
        ) : (
          friendRequests?.map((person) => {
            return (
              <div className={styles.profile} key={person._id}>
                <div className={styles.img}>
                  <img src={person.avatar} alt="Profile Image" />
                </div>
                <div className={styles.txt}>
                  <p>{person.username}</p>
                </div>
                <div className={styles.panel}>
                  <button
                    onClick={async () => {
                      await acceptRequest(
                        toast,
                        person.userId,
                        dispatch,
                        setFriendRequests
                      );
                    }}
                  >
                    Accept
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default FriendRequests;
