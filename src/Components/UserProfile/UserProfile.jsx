import React, { useState } from "react";
import styles from "./UserProfile.module.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SettingsIcon from "@mui/icons-material/Settings";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../api";
import { Close } from "@mui/icons-material";
import alt from "../../assets/alt.webp";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { toast } from "react-hot-toast";
import axios from "axios";
import { settingsPage } from "../../redux/primary";

const UserProfile = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [showPeople, setShowPeople] = useState(false);

  return (
    <div className={styles.main}>
      <div className={styles.profile}>
        <div className={styles.intro}>
          {user.avatar !== "" ? (
            <img src={user.avatar} alt="Profile Image" />
          ) : (
            1
          )}
          <h1>{user.username}</h1>
          <p>{user.caption}</p>
        </div>
        <div className={styles.panel}>
          <button
            onClick={() => {
              setShowPeople(true);
            }}
          >
            <span style={{ margin: "0px 5px" }}>{user.friends.length}</span>{" "}
            Friends
          </button>
          <button
            onClick={async () => {
              await logout(dispatch);
            }}
          >
            <LogoutIcon /> Logout
          </button>
          <button
            onClick={() => {
              dispatch(settingsPage());
            }}
          >
            <SettingsIcon /> Settings
          </button>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.info}>
          <h1>User Info</h1>
          <p>
            <label>Name</label> {user.name}
          </p>
          <p>
            <label>Email</label>
            {user.email}
          </p>
          <p>
            <label>
              <LocationOnIcon />
              Location
            </label>
            {user.city}
          </p>
          <p>
            <label>Bio</label>
            {user.bio}
          </p>
        </div>
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
            {user?.friends.length === 0 ? (
              <div className="alt">
                <h1>You have no friends!</h1>
              </div>
            ) : (
              user?.friends.map((person, index) => {
                return (
                  <div className={styles.frnd} key={index}>
                    <img src={person.avatar || alt} alt="Profile Photo" />
                    <h1>{person.username}</h1>
                    <button
                      onClick={async () => {
                        try {
                          let res = await axios.put(
                            `http://localhost:4000/user/unfriend`,
                            { id: person.userId },
                            {
                              headers: { "Content-Type": "application/json" },
                              withCredentials: true,
                            }
                          );
                          toast.success(res.data.message);
                        } catch (error) {
                          return toast.error(error.response.data.message);
                        }
                      }}
                    >
                      <PersonRemoveIcon /> Remove
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
