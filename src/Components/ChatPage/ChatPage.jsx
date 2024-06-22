import React, { useEffect, useState } from "react";
import styles from "./ChatPage.module.css";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import CallIcon from "@mui/icons-material/Call";
import VideocamIcon from "@mui/icons-material/Videocam";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DoneIcon from "@mui/icons-material/Done";
import SendIcon from "@mui/icons-material/Send";
import FilePresentRoundedIcon from "@mui/icons-material/FilePresentRounded";
import InputEmoji from "react-input-emoji";
import ReplyIcon from "@mui/icons-material/Reply";
import msgAudio from "../../assets/message.mp3";
import CloseIcon from "@mui/icons-material/Close";
import alt from "../../assets/alt.webp";
import { useDispatch, useSelector } from "react-redux";
import {
  createMessage,
  getAllMessage,
  getSingleGroup,
  getUser,
} from "../../api";
import { groupPage, profilePage } from "../../redux/primary";
import BLoader from "../BLoader/BLoader";

const ChatPage = ({ user, setSendMessage, receivedMessage, socket }) => {
  const onlineUsers = useSelector((state) => state.chat.onlineUsers);
  const primary = useSelector((state) => state.primaryPage);
  const [User, setUser] = useState(null);
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [replyText, setReplyText] = useState("");
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState("");
  const [stdTyping, setStdTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const [seen, setSeen] = useState(false);
  const createdAt = Date.now();
  const dispatch = useDispatch();
  let isOnline = onlineUsers.find((user) => {
    return user.userId === primary.id;
  });

  const getImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };
  let audio = new Audio(msgAudio);
  useEffect(() => {
    if (primary.chatId === null) {
      (async () => {
        let gr = await getSingleGroup(primary.id, setGroup);
        let msgs = await getAllMessage(gr._id);
        setMessages(msgs);
        socket.current.emit("join-group", {
          user: user._id,
          group: gr._id,
        });
        setLoading(false);
      })();
      setUser(null);
    } else {
      (async () => {
        let usr = await getUser(setLoading, primary.id);
        setUser(usr);
        let msgs = await getAllMessage(primary.chatId);
        setMessages(msgs);
        setGroup(null);
        setLoading(false);
      })();
    }
  }, [primary]);
  useEffect(() => {
    if (
      receivedMessage !== null &&
      receivedMessage.chatId === primary?.chatId
    ) {
      setMessages([...messages, receivedMessage]);
    }
    if (receivedMessage !== null && receivedMessage.chatId === group?._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (message === "" && image === "") {
      return null;
    }
    if (isOnline !== null) {
      setSeen(true);
    } else {
      setSeen(false);
    }
    User !== null
      ? setSendMessage({
          text: message,
          image: image,
          senderId: user._id,
          receiverId: User === null ? group?._id : User?._id,
          replyText: replyText,
          createdAt: Date.now(),
          chatId: primary.chatId !== null ? primary?.chatId : group?.name,
          seen,
        })
      : socket.current.emit("group-message", {
          text: message,
          image: image,
          senderId: user._id,
          receiverId: User === null ? group?._id : User?._id,
          replyText: replyText,
          createdAt: Date.now(),
          chatId: primary.chatId !== null ? primary?.chatId : group?._id,
          seen,
        });
    await createMessage(
      user._id,
      primary.chatId !== null ? primary?.chatId : group?._id,
      message,
      replyText,
      Date.now(),
      seen,
      image
    );
    setMessage("");
    setReplyText("");
    setImage("");
  };

  return loading ? (
    <BLoader />
  ) : (
    <div className={styles.main}>
      <div className={styles.header}>
        <div
          className={styles.img}
          onClick={() => {
            User !== null
              ? dispatch(profilePage(User._id))
              : dispatch(groupPage(group._id));
          }}
        >
          <img
            src={User === null ? group?.image || alt : User?.avatar || alt}
            alt="Profile Image"
          />

          <div className={styles.status}>
            <h1>{User === null ? group?.name : User?.username}</h1>
            {stdTyping && <span color="red">Typing...</span>}
            {isOnline ? (
              <span className={styles.online}>Online</span>
            ) : (
              <span className={styles.Offline} style={{ color: "grey" }}>
                Offline
              </span>
            )}
          </div>
        </div>
        <div className={styles.headPanel}>
          <ul>
            <li>
              <Link>
                <SearchIcon />
              </Link>
            </li>{" "}
            <li>
              <Link>
                <CallIcon />{" "}
              </Link>
            </li>
            <li>
              <Link>
                <VideocamIcon />{" "}
              </Link>
            </li>
            <li>
              <Link>
                <InfoIcon />{" "}
              </Link>
            </li>
            <li>
              <Link>
                <MoreVertIcon />{" "}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.chat}>
        {messages?.map((msg, index) => {
          const now = new Date(msg.createdAt);
          const hours = now.getHours();
          const minutes = now.getMinutes();
          const timeString = `${hours < 12 ? hours : hours - 12}:${minutes
            .toString()
            .padStart(2, "0")} ${hours < 12 ? "AM" : "PM"}`;
          return (
            <div
              key={index}
              className={`${
                msg.senderId === user._id ? "mine" : "left"
              } message`}
            >
              <div className={styles.msg}>
                {msg.replyText !== "" && (
                  <div className={styles.replyText}>
                    <span>Reply to :</span>
                    <p>{msg.replyText}</p>
                  </div>
                )}
                <p>
                  {msg.image === "" ? null : (
                    <img src={msg.image} alt={msg.text} />
                  )}
                  {msg.text}
                </p>
                <div className={styles.stInfo}>
                  <span className={msg.seen ? styles.done : styles.notDone}>
                    {timeString}
                    {msg.senderId !== user._id ? (
                      msg.seen ? (
                        <DoneAllIcon />
                      ) : (
                        <DoneIcon />
                      )
                    ) : null}
                  </span>
                </div>
              </div>
              <div className={"select"}>
                <button
                  onClick={() => {
                    setReplyText(msg.text);
                  }}
                >
                  <ReplyIcon />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {replyText !== "" ? (
        <div className={styles.ext}>
          <button
            className={styles.close}
            onClick={() => {
              setReplyText("");
            }}
          >
            <CloseIcon />
          </button>
          <p>{replyText}</p>
        </div>
      ) : null}
      {image !== "" ? (
        <div className={styles.ext}>
          <button
            className={styles.close}
            onClick={() => {
              setImage("");
            }}
          >
            <CloseIcon />
          </button>
          <img src={image} alt="message-image" />
        </div>
      ) : null}

      <div className={styles.panel}>
        <form
          onSubmit={(e) => {
            handleSend(e);
          }}
        >
          <InputEmoji
            value={message}
            onChange={(newMessage) => {
              setMessage(newMessage);
            }}
            placeholder={"Type Your Message"}
          />
          <button
            onClick={() => {
              document.querySelector(".image-input").click();
            }}
          >
            <input
              type="file"
              accept="image/jpg, image/jpeg, image/png"
              hidden
              className="image-input"
              name="photo"
              style={{ borderRadius: "10px" }}
              onChange={(e) => {
                getImage(e);
              }}
            />
            <FilePresentRoundedIcon />
          </button>
          <button className={styles.send}>
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
};
export default ChatPage;
