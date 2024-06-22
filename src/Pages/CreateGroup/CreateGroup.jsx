import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGroup } from "../../api";
import styles from "./CreateGroup.module.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const CreateGroup = () => {
  const [city, setCity] = useState("");
  const [pprivate, setPrivate] = useState(false);
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  let cities = [
    "Los Santons",
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
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Create A Group</h1>
        </div>
        <div className={styles.panel}>
          <div className={styles.side}>
            <label>
              Group Avatar
              {image !== "" ? (
                <img src={image} className="createImg" />
              ) : (
                <AccountCircleIcon
                  sx={{ color: "royalBlue", fontSize: "100px" }}
                />
              )}
              <input
                type="text"
                name="image"
                placeholder="Paste the link of the photo"
                onChange={(e) => {
                  setImage(e.target.value);
                }}
              />
            </label>
            <label>
              Group Name
              <input
                type="text"
                name="name"
                placeholder="Group Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>
            <label>
              Group Caption
              <input
                type="text"
                name="caption"
                placeholder="A Cool Caption for group"
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
                onChange={(event) => {
                  setCity(event.target.value);
                }}
              >
                <option value="">Select A City</option>
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
              Group Bio
              <textarea
                name="textArea"
                cols="50"
                rows="5"
                placeholder="Information About your group."
                onChange={(e) => {
                  setBio(e.target.value);
                }}
              ></textarea>
            </label>
            <label htmlFor="mover">
              Private Group
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
            <button
              className={styles.submit}
              onClick={async (e) => {
                e.preventDefault();
                await createGroup(
                  image,
                  name,
                  caption,
                  city,
                  bio,
                  pprivate,
                  navigate
                );
              }}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
