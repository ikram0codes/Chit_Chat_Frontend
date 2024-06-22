import React, { useEffect, useState } from "react";
import styles from "./GroupProfile.module.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { addUser, getSingleGroup } from "../../api";
import { useSelector } from "react-redux";
import alt from "../../assets/alt.webp";
import { Close } from "@mui/icons-material";
import BLoader from "../BLoader/BLoader";
const GroupProfile = ({ user }) => {
  const [group, setGroup] = useState({});
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const primary = useSelector((state) => state.primaryPage);
  const [showPeople, setShowPeople] = useState(false);
  useEffect(() => {
    (async () => {
      let gr = await getSingleGroup(primary.id, setGroup);
      if (gr.admin === user?._id) {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
      setLoading(false);
    })();
  }, [primary.id]);
  return loading ? (
    <BLoader />
  ) : (
    <div className={styles.main}>
      <div className={styles.profile}>
        <div className={styles.intro}>
          <img src={group?.image || alt} alt="Profile Image" />
          <h1>{group?.name}</h1>
          <p>{group?.caption}</p>
        </div>
        <div className={styles.panel}>
          <button>
            <span style={{ color: "#007FFF", margin: "0px 5px" }}>
              {group?.members?.length}
            </span>{" "}
            Members
          </button>
          <button>{admin ? "Settings" : "Admin"}</button>
          <button
            onClick={() => {
              setShowPeople(true);
            }}
          >
            <PersonAddIcon />
            {admin ? "People" : "Join"}
          </button>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.info}>
          <h1>Group Info</h1>
          <p>
            <label>Admin</label>
            {group?.email}
          </p>
          <p>
            <label>
              <LocationOnIcon />
              Location
            </label>
            {group?.location}
          </p>

          <p>
            <label>Group Bio</label>
            {group?.bio}
          </p>
        </div>
      </div>
      {admin && showPeople && (
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
            {user?.friends.map((person, index) => {
              return (
                <div className={styles.frnd} key={index}>
                  <img src={person.avatar || alt} alt="Profile Photo" />
                  <h1>{person.username}</h1>
                  <button
                    onClick={async () => {
                      await addUser(person.userId, group._id);
                    }}
                  >
                    Add
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupProfile;
