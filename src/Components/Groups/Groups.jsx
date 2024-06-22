import React, { useEffect, useState } from "react";
import styles from "./Groups.module.css";
import alt from "../../assets/alt.webp";
import { addUser, getAllGroups, getSug } from "../../api";
import { groupChatPage } from "../../redux/primary";
import { useDispatch } from "react-redux";
import BLoader from "../BLoader/BLoader";
const Groups = ({ user }) => {
  const [groups, setGroups] = useState([]);
  const [sug, setSugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const cPs = document.querySelectorAll(".groupProfile");
  const removeAllClasses = () => {
    cPs.forEach((cp) => {
      cp.classList.remove("selectedChat");
    });
  };
  cPs.forEach((cp) => {
    cp.addEventListener("click", () => {
      removeAllClasses();
      cp.classList.add("selectedChat");
    });
  });
  useEffect(() => {
    (async () => {
      let grps = await getAllGroups(user._id);
      setGroups(grps);
      let sugs = await getSug();
      setSugs(sugs);
      setLoading(false);
    })();
  }, []);
  return loading ? (
    <BLoader />
  ) : (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.head} style={{ textAlign: "left" }}>
          All Groups
        </h1>
        <span>{groups?.length}</span>
      </div>
      <div className={styles.groups}>
        {groups.length === 0 ? (
          <div className="alt">
            <h1>You Are Not Joined In Any Group!</h1>
          </div>
        ) : (
          groups?.map((group) => {
            return (
              <div
                className={`${styles.group} groupProfile`}
                key={group._id}
                onClick={() => {
                  dispatch(groupChatPage(group._id));
                }}
              >
                <div className={styles.img}>
                  <img src={group?.image || alt} alt="Group Profile" />
                </div>
                <div className={styles.txt}>
                  <h1>{group.name}</h1>
                  <p>{group.caption}</p>
                </div>
                <div className={styles.status}>
                  <p className={styles.time}>10:23</p>
                  <span className={styles.msgCount}>4</span>
                </div>
              </div>
            );
          })
        )}
        <div className={styles.sug}>
          <h1 className={styles.head}>Suggestions</h1>
          {sug.map((group) => {
            return (
              <div
                className={styles.group}
                key={group._id}
                onClick={async () => {
                  await addUser(user._id, group._id);
                  dispatch(groupChatPage(group._id));
                }}
              >
                <div className={styles.img}>
                  <img src={group?.image || alt} alt="Group Profile" />
                </div>
                <div className={styles.txt}>
                  <h1>{group.name}</h1>
                  <p>{group.caption}</p>
                </div>
                <div className={styles.status}>
                  <p className={styles.time}>10:23</p>
                  <span className={styles.msgCount}>4</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Groups;
