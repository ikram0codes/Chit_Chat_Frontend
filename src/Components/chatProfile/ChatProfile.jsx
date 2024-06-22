import React, { useEffect, useState } from "react";
import { getAllMessage, getUser } from "../../api";
import styles from "../Chats/Chats.module.css";
import { useDispatch } from "react-redux";
import { chatPage } from "../../redux/primary";
import alt from "../../assets/alt.webp";

const ChatProfile = ({ chat, user, receivedMessage }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState("");
  const [User, setUser] = useState("");
  const [lastMesage, setLastMessage] = useState("No recent message!");
  const [lastTime, setLastTime] = useState(null);
  const [unseen, setUnseen] = useState("");
  const [messages, setMessages] = useState([]);
  const cPs = document.querySelectorAll(".chatProfile");
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
  const userId = chat.members.find((id) => {
    return id !== user._id;
  });
  useEffect(() => {
    (async () => {
      let usr = await getUser(setLoading, userId);
      setUser(usr);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      let msg = await getAllMessage(chat._id);
      let lstMsg = msg[msg.length - 1];
      if (lstMsg) {
        lstMsg.senderId !== user._id
          ? setLastMessage(`${User.username || "Other"} : ${lstMsg?.text}`)
          : setLastMessage(`You : ${lstMsg?.text}`);
        const now = new Date(lstMsg?.createdAt);
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const timeString = `${hours < 12 ? hours : hours - 12}  : ${minutes
          .toString()
          .padStart(2, "0")} ${hours < 12 ? "AM" : "PM"}`;
        setLastTime(timeString);
      } else {
        setLastMessage("No Recent Message!");
      }

      setMessages(msg);
      let notseen = messages.filter((m) => {
        return m.seen !== true;
      });
      setUnseen(notseen.length);
    })();
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      receivedMessage.senderId !== user._id
        ? setLastMessage(
            `${User?.username || "Other"} : ${receivedMessage.text}`
          )
        : setLastMessage(`You: ${receivedMessage.text}`);
      const now = new Date(receivedMessage.createdAt);
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const timeString = `${hours < 12 ? hours : hours - 12}:${minutes
        .toString()
        .padStart(2, "0")} ${hours < 12 ? "AM" : "PM"}`;
      setLastTime(timeString);
    }
  }, [receivedMessage]);

  return (
    <div
      className={"chatProfile"}
      onClick={() => {
        dispatch(chatPage([User._id, chat._id]));
      }}
    >
      <div className={styles.img}>
        <img src={User?.avatar || alt} alt="Profile Image" />
      </div>
      <div className={styles.txt}>
        <h1>{User?.name}</h1>
        <p>{lastMesage.substring(0, 30)}...</p>
      </div>
      <div className={styles.status}>
        <p className={styles.time}>{lastTime !== null ? lastTime : ""}</p>
        <span className={styles.msgCount}>{unseen}</span>
      </div>
    </div>
  );
};

export default ChatProfile;
