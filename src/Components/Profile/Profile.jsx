import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useDispatch, useSelector } from "react-redux";
import { createChat, getUser } from "../../api";
import { toast } from "react-hot-toast";
import { chatPage } from "../../redux/primary";
import alt from "../../assets/alt.webp";
import axios from "axios";
import { Close } from "@mui/icons-material";
import BLoader from "../BLoader/BLoader";

const Profile = ({ user }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [friend, setFriend] = useState(false);
  const [friends, setFriends] = useState(0);
  const [User, setUser] = useState(null);
  const [showPeople, setShowPeople] = useState(false);

  const id = useSelector((state) => state.primaryPage.id);
  useEffect(() => {
    (async () => {
      let usr = await getUser(setLoading, id);
      setUser(usr);
    })();
  }, [id]);
  useEffect(() => {
    let fUser = User?.friends.find((us) => {
      return us.userId === user._id;
    });
    if (fUser) {
      setFriend(true);
    } else {
      setFriend(false);
    }
    setFriends(User?.friends.length);
  }, [User]);
  return loading ? (
    <BLoader />
  ) : (
    <div className={styles.main}>
      <div className={styles.profile}>
        <div className={styles.intro}>
          <img src={User?.avatar || alt} alt="Profile Image" />
          <h1>{User?.username}</h1>
          <p>{User?.caption}</p>
        </div>
        <div className={styles.panel}>
          <button
            onClick={() => {
              setShowPeople(true);
            }}
          >
            <span style={{ color: "#007FFF" }}>{friends}</span>&nbsp; Friends
          </button>
          <button
            onClick={async () => {
              let cid = await createChat(user._id, User._id);
              dispatch(chatPage([User._id, cid]));
            }}
          >
            Message
          </button>
          {friend === true ? (
            <button
              onClick={async () => {
                try {
                  let res = await axios.put(
                    `http://localhost:4000/user/unfriend`,
                    { id: User._id },
                    {
                      headers: { "Content-Type": "application/json" },
                      withCredentials: true,
                    }
                  );

                  toast.success(res.data.message);
                  if (
                    res.data.message ===
                    `${User.username} is no longer your friend`
                  ) {
                    setFriend(false);
                    return setFriends(friends - 1);
                  } else {
                    setFriend(true);
                    return setFriends(friends);
                  }
                } catch (error) {
                  return toast.error(error.response.data.message);
                }
              }}
            >
              <PersonRemoveIcon /> Remove
            </button>
          ) : (
            <button
              onClick={async () => {
                try {
                  let res = await axios.put(
                    `http://localhost:4000/user/addfriend`,
                    { id: User._id },
                    {
                      headers: { "Content-Type": "application/json" },
                      withCredentials: true,
                    }
                  );

                  toast.success(res.data.message);
                  if (
                    res.data.message ===
                    `You are now friend with ${User.username}`
                  ) {
                    setFriend(true);
                    return setFriends(friends + 1);
                  }
                } catch (error) {
                  return toast.error(error.response.data.message);
                }
              }}
            >
              <PersonAddIcon /> Add
            </button>
          )}
        </div>
        <div className={styles.divider}></div>

        {User.private && friend === false ? (
          <h1 className={styles.alt}>This Account Is Private</h1>
        ) : (
          <div className={styles.info}>
            <h1>User Info</h1>
            <p>
              <label>Name</label> {User.name}
            </p>
            <p>
              <label>Email</label>
              {User.hideEmail ? "hidden" : User.email}
            </p>
            <p>
              <label>
                <LocationOnIcon />
                Location
              </label>
              {User.city}
            </p>
            <p>
              <label>Bio</label>
              {User.bio}
            </p>
          </div>
        )}
      </div>
      {showPeople && (
        <div className={styles.friends}>
          <button
            className={styles.close}
            onClick={() => {
              setShowPeople(false);
            }}
          >
            <Close />
          </button>
          <div className={styles.list}>
            {User?.friends.map((person, index) => {
              return (
                <div className={styles.frnd} key={index}>
                  <img src={person.avatar || alt} alt="Profile Photo" />
                  <h1>{person.username}</h1>
                  <button onClick={async () => {}}>Add</button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
