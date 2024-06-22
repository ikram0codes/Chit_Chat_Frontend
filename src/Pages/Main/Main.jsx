import React from "react";
import { useSelector } from "react-redux";
import Chats from "../../Components/Chats/Chats";
import Menu from "../../Components/Menu/Menu";
import Primary from "../../Components/Primary/Primary";
import styles from "./Main.module.css";
import Search from "../../Components/Search/Search";
import Groups from "../../Components/Groups/Groups";
import Favourites from "../../Components/Favourites/Favourites";
import Explore from "../../Components/Explore/Explore";
import FriendRequests from "../../Components/FriendRequests/FriendRequests";
import Profile from "../../Components/Profile/Profile";
import GroupProfile from "../../Components/GroupProfile/GroupProfile";
import UserProfile from "../../Components/UserProfile/UserProfile";
import ChatPage from "../../Components/ChatPage/ChatPage";
import Notifications from "../../Components/Notifications/Notifications";
import Settings from "../../Components/Settings/Settings";

const Main = ({ receivedMessage, setSendMessage, socket }) => {
  const secondaryPage = useSelector((state) => state.secondaryPage.page);
  const primaryPage = useSelector((state) => state.primaryPage.page);
  const user = useSelector((state) => state.user.user);
  return (
    <div className={styles.main}>
      <div className={styles.menu}>
        <Menu />
      </div>
      <div className={styles.container}>
        <Search />
        {secondaryPage === "chats" && (
          <Chats user={user} receivedMessage={receivedMessage} />
        )}
        {secondaryPage === "friendRequests" && <FriendRequests user={user} />}
        {secondaryPage === "groups" && <Groups user={user} />}
        {secondaryPage === "explore" && <Explore user={user} />}
        {secondaryPage === "favourite" && <Favourites />}
        {secondaryPage === "notifications" && <Notifications user={user} />}
      </div>
      <div className={styles.primary}>
        {primaryPage === "userprofile" && <UserProfile />}
        {primaryPage === "groupProfile" && <GroupProfile user={user} />}
        {primaryPage === "profile" && <Profile user={user} />}
        {primaryPage === "chat" && (
          <ChatPage
            user={user}
            setSendMessage={setSendMessage}
            receivedMessage={receivedMessage}
            socket={socket}
          />
        )}
        {primaryPage === "welcome" && <Primary />}
        {primaryPage === "settings" && <Settings user={user} />}
      </div>
    </div>
  );
};

export default Main;
