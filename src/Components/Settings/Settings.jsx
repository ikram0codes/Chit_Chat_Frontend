import React, { useState } from "react";
import styles from "./Settings.module.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { setProfile } from "../../api";
import { useDispatch } from "react-redux";
import { Close } from "@mui/icons-material";

const Settings = ({ user }) => {
  const [city, setCity] = useState(user.city);
  const [name, setName] = useState(user.name);
  const [caption, setCaption] = useState(user.caption);
  const [bio, setBio] = useState(user.bio);
  const [avatar, setAvatar] = useState(user.avatar);
  const [pprivate, setPrivate] = useState(user.private);
  const [hideEmail, setHideEmail] = useState(user.hideEmail);
  const dispatch = useDispatch();
  const [avatarOpt, setAvatarOpt] = useState(false);

  const getAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setAvatar(reader.result);
    };
  };
  let cities = [
    "Los Santos",
    "New York",
    "Ohio",
    "Los Angeles",
    "Huston",
    "San Fransisco",
    "Denver",
    "Seattle",
    "San Deigo",
    "Miami",
    "Albany",
    "Chicago",
    "Phoenix",
  ];
  let one =
    "https://i.pinimg.com/564x/e3/29/20/e32920be7fe7748df4cd09c372b14a78.jpg";
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Chit Chat Settings</h1>
        </div>
        <div className={styles.panel}>
          <div className={styles.side}>
            <label>
              Avatar
              <button
                onClick={() => {
                  setAvatarOpt(true);
                }}
              >
                {avatar !== "" ? (
                  <img src={avatar} className="createImg" />
                ) : (
                  <AccountCircleIcon
                    sx={{ color: "royalBlue", fontSize: "100px" }}
                  />
                )}
              </button>
            </label>
            <label>
              Name
              <input
                type="text"
                value={name}
                placeholder="Full Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>
            <label>
              Caption
              <input
                value={caption}
                type="text"
                placeholder="Your Profile Caption"
                onChange={(e) => {
                  setCaption(e.target.value);
                }}
              />
            </label>
          </div>
          <div className={styles.side}>
            <label>
              Location
              <select
                name="City Selector"
                onChange={(event) => {
                  setCity(event.target.value);
                }}
              >
                <option value={city}>{city}</option>
                {cities.map((city, i) => {
                  return (
                    <option key={i} value={city}>
                      {city}
                    </option>
                  );
                })}
              </select>
            </label>
            <label>
              Bio
              <textarea
                name="textArea"
                value={bio}
                cols="50"
                rows="5"
                placeholder="Your Bio"
                onChange={(e) => {
                  setBio(e.target.value);
                }}
              ></textarea>
            </label>
            <label>
              Private Profile
              <button
                className={styles.privacy}
                onClick={() => {
                  if (pprivate === false) {
                    document.getElementById("mover").style.transform =
                      "translate(25px)";
                    setPrivate(true);
                  } else {
                    document.getElementById("mover").style.transform =
                      "translate(0px)";
                    setPrivate(false);
                  }
                }}
              >
                <p>Off</p>
                <span id="mover"></span>
                <p>On</p>
              </button>
            </label>
            <label>
              Hide Email
              <button
                className={styles.privacy}
                onClick={() => {
                  if (hideEmail === false) {
                    document.getElementById("emover").style.transform =
                      "translate(25px)";
                    setHideEmail(true);
                  } else {
                    document.getElementById("emover").style.transform =
                      "translate(0px)";
                    setHideEmail(false);
                  }
                }}
              >
                <p>Off</p>
                <span id="emover"></span>
                <p>On</p>
              </button>
            </label>
            <button
              className={styles.submit}
              onClick={async (e) => {
                e.preventDefault();
                await setProfile(
                  avatar,
                  city,
                  bio,
                  caption,
                  name,
                  hideEmail,
                  pprivate,
                  dispatch
                );
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      {avatarOpt && (
        <div className={styles.selectAvatar}>
          <button
            className={styles.close}
            onClick={() => {
              setAvatarOpt(false);
            }}
          >
            <Close />
          </button>
          <div className={styles.avatars}>
            <h1 className="head">Select an Avatar</h1>
            <div className={styles.list}>
              <div
                className={styles.pic}
                onClick={() => {
                  setAvatar(One);
                  setAvatarOpt(false);
                }}
              >
                <img src={One} alt="avatar" />
              </div>
              <div className={styles.pic}>
                <img src={One} alt="avatar" />
              </div>
              <div className={styles.pic}>
                <img src={One} alt="avatar" />
              </div>
              <div className={styles.pic}>
                <img src={One} alt="avatar" />
              </div>
              <div className={styles.pic}>
                <img src={One} alt="avatar" />
              </div>
              <div className={styles.pic}>
                <img src={One} alt="avatar" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
