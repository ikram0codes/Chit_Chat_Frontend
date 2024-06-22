import React, { useEffect, useState } from "react";
import styles from "./Explore.module.css";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { suggestions } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { profilePage } from "../../redux/primary";
import BLoader from "../BLoader/BLoader";

const Explore = ({ user }) => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredUser, setfilteredUser] = useState([]);
  const city = useSelector((state) => state.user.user.city);

  useEffect(() => {
    (async () => {
      let usrs = await suggestions(city, setLoading);
      setUsers(usrs);
    })();
  }, []);
  useEffect(() => {
    let us =
      users !== null &&
      users.filter((person) => {
        return person._id !== user._id;
      });
    setfilteredUser(us);
  }, [users]);
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.head}>Your City</h1>
        <span>{filteredUser.length}</span>
      </div>
      <div className={styles.results}>
        {loading ? (
          <BLoader />
        ) : filteredUser.length === 0 ? (
          <div className={"alt"}>
            <h1>No Users in Your Area</h1>
          </div>
        ) : (
          filteredUser.map((user) => {
            return (
              <div
                key={user._id}
                className={styles.profile}
                onClick={() => {
                  dispatch(profilePage(user._id));
                }}
              >
                <div className={styles.img}>
                  <img src={user.avatar} alt="profile" />
                </div>
                <div className={styles.txt}>
                  <h1>{user.username}</h1>
                  <p>{user.name}</p>
                </div>
                <div className={styles.panel}>
                  <button>
                    <AddCommentIcon />
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

export default Explore;
