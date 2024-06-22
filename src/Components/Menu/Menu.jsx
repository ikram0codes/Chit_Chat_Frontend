import React, { useEffect, useState } from "react";
import styles from "./Menu.module.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatIcon from "@mui/icons-material/Chat";
import ExploreIcon from "@mui/icons-material/Explore";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";
import { useSelector, useDispatch } from "react-redux";
import { setSecondaryPage } from "../../redux/secondary";
import { settingsPage, userProfilePage, welcome } from "../../redux/primary";
import StarIcon from "@mui/icons-material/Star";
const Menu = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [ltabs, setLtabs] = useState([]);
  const removeActive = () => {
    let tabs = document.querySelectorAll("a");
    tabs.forEach((tab) => {
      tab.style.color = "#4297dc";
      tab.style.transform = "scale(1)";
    });
  };
  ltabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      removeActive();
      tab.style.color = "#7A19A1";
      tab.style.transform = "scale(1.2)";
    });
  });

  useEffect(() => {
    let lis = document.querySelectorAll("ul li a");
    setLtabs(lis);
  }, []);
  return (
    <div className={styles.main}>
      <div className={styles.logo}>
        <Link
          to="/"
          onClick={() => {
            dispatch(welcome());
            dispatch(setSecondaryPage("chats"));
          }}
        >
          <img src={logo} alt="Chit Chat" />
        </Link>
      </div>
      <div className={styles.links}>
        <ul id="lis">
          <li>
            <Link
              to={"/"}
              onClick={() => {
                dispatch(setSecondaryPage("chats"));
              }}
            >
              <ChatIcon />
            </Link>
          </li>
          <li>
            <Link
              to={"/"}
              onClick={() => {
                dispatch(setSecondaryPage("groups"));
              }}
            >
              <GroupsRoundedIcon />
            </Link>
          </li>
          <li>
            <Link to={"/creategroup"}>
              <GroupAddRoundedIcon />
            </Link>
          </li>
          <li>
            <Link
              to={"/"}
              onClick={() => {
                dispatch(setSecondaryPage("favourite"));
              }}
            >
              <StarIcon />
            </Link>
          </li>
          <li>
            <Link
              to={"/"}
              onClick={() => {
                dispatch(setSecondaryPage("explore"));
              }}
            >
              <ExploreIcon />
            </Link>
          </li>
          <li>
            <Link
              to={"/"}
              onClick={() => {
                dispatch(settingsPage());
              }}
            >
              <SettingsIcon />
            </Link>
          </li>{" "}
          <li>
            <Link
              to={"/"}
              onClick={() => {
                dispatch(setSecondaryPage("friendRequests"));
              }}
            >
              {user?.friendRequests.length !== 0 && (
                <span className={styles.num}>
                  {user ? user.friendRequests.length : 0}
                </span>
              )}
              <FavoriteIcon />
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.profile}>
        <ul>
          <li>
            <Link
              to={"/"}
              onClick={() => {
                dispatch(setSecondaryPage("notifications"));
              }}
            >
              {user.notifications.length !== 0 && (
                <span className={styles.nnum}>
                  {user.notifications?.length}
                </span>
              )}
              <NotificationsIcon />
            </Link>
          </li>
          <li>
            <Link
              to={"/"}
              onClick={() => {
                dispatch(userProfilePage());
              }}
            >
              <img
                src={user?.avatar}
                alt="Profile Image"
                className={styles.pImg}
              />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
