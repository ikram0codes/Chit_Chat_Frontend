import React, { useState } from "react";
import styles from "./SetProfile.module.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { setProfile } from "../../api";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Close, Tune } from "@mui/icons-material";
import { setAvatars } from "../../constants";
const SetProfile = () => {
  const user = useSelector((state) => state.user.user);
  const isProfileSet = user !== null ? user.isProfileSet : false;
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [caption, setCaption] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [pprivate, setPrivate] = useState(false);
  const [hideEmail, setHideEmail] = useState(false);
  const [avatarOpt, setAvatarOpt] = useState(false);
  const dispatch = useDispatch();
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
  return isProfileSet === true ? (
    <Navigate to={"/"} />
  ) : (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>
            Set Up Your <span>Chit Chat</span> &nbsp;Profile To Continue
          </h1>
        </div>
        <div className={styles.panel}>
          <div className={styles.side}>
            <label>
              Avatar
              {
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
              }
            </label>
            <label>
              Name
              <input
                type="text"
                placeholder="Full Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>
            <label>
              Caption
              <input
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
                <option value="">Select A Dummy City</option>
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
                  dispatch,
                  avatar,
                  city,
                  bio,
                  caption,
                  name,
                  hideEmail,
                  pprivate
                );
                <Navigate to={"/"} />;
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
              {setAvatars.map((avt, index) => {
                return (
                  <div
                    key={index}
                    className={styles.pic}
                    onClick={() => {
                      setAvatar(avt);
                      setAvatarOpt(false);
                    }}
                  >
                    <img src={avt} alt="avatar" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetProfile;
