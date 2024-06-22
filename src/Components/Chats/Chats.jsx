import React, { useEffect, useState } from "react";
import styles from "./Chats.module.css";
import { profilePage } from "../../redux/primary";
import { getAllChats, getSugUsers } from "../../api";
import ChatProfile from "../chatProfile/ChatProfile.jsx";
import styls from "../Explore/Explore.module.css";
import { useDispatch } from "react-redux";
import AddCommentIcon from "@mui/icons-material/AddComment";
import BLoader from "../BLoader/BLoader";
import { textTransform } from "@mui/system";

const Chats = ({ user, receivedMessage }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sugs, setSugs] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      let chats = await getAllChats(user._id);
      let sug = await getSugUsers();
      setChats(chats);
      let fsug = sug.filter((sg) => {
        return sg._id !== user._id;
      });
      setSugs(fsug);
      setLoading(false);
    })();
  }, []);
  return loading ? (
    <BLoader />
  ) : (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1 style={{ fontSize: "25px" }}>Inbox</h1>
        <span>{chats?.length}</span>
      </div>
      <div className={styles.chats}>
        {chats.length === 0 ? (
          <div className="alt">
            <h1>You Have No Chats!</h1>
          </div>
        ) : (
          chats?.map((chat) => {
            return (
              <ChatProfile
                key={chat._id}
                chat={chat}
                user={user}
                receivedMessage={receivedMessage}
              />
            );
          })
        )}
      </div>
      <div className={styles.sug}>
        <h1 className={styles.head} style={{ fontSize: "20px" }}>
          Suggestions
        </h1>
        {sugs.map((user) => {
          return (
            <div
              key={user._id}
              className={styls.profile}
              onClick={() => {
                dispatch(profilePage(user._id));
              }}
            >
              <div className={styls.img}>
                <img src={user.avatar} alt="profile" />
              </div>
              <div className={styls.txt}>
                <h1>{user.username}</h1>
                <p>{user.name}</p>
              </div>
              <div className={styls.panel}>
                <button>
                  <AddCommentIcon />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Chats;
