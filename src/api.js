import axios from "axios";
import { toast } from "react-hot-toast";
import {
  RegisterSuccess,
  LoginSuccess,
  LogoutUserSuccess,
  acceptRequestSuccess,
  sendRequest,
  LoadUserSuccess,
} from "./redux/user";
const baseUrl = "http://localhost:4000";
let toastStyles = {
  duration: "300",
  style: {
    width: "max-content",
    border: "1px solid #713200",
    padding: "10px 15px",
    color: "white",
    backgroundColor: "#9C19D0",
    borderRadius: "0px",
  },

  icon: "❌",
  iconTheme: {
    primary: "#713200",
    secondary: "#FFFAEE",
  },
};
export const submit = async (
  e,
  username,
  email,
  password,
  toast,
  dispatch,
  navigate
) => {
  let hasCapital = /[A-Z]/.test(password);
  let uCapital = /[A-Z]/.test(username);
  const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(
    password
  );
  let validLength = password.length > 8;

  e.preventDefault();
  if (username === "" || email === "" || password === "") {
    return toast.error("Please Fill All the Credentials", toastStyles);
  }
  if (uCapital) {
    return toast.error(
      "Username should not contain capital letters.",
      toastStyles
    );
  }
  // if (username.includes("")) {
  //   return toast.error(
  //     "Username should not contain space characters.",
  //     toastStyles
  //   );
  // }
  if (!hasCapital) {
    return toast.error("Password must contain a capital letter.", toastStyles);
  }
  if (!specialCharRegex) {
    return toast.error(
      "Password must contain a Special Character.",
      toastStyles
    );
  }
  if (!validLength) {
    return toast.error(
      "Password must be greater than 8 Characters",
      toastStyles
    );
  }
  try {
    let res = await axios.post(
      `${baseUrl}/user/register`,
      {
        username,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch(RegisterSuccess(res.data.user));
    toast.success(res.data.message);
    return navigate("/setprofile");
  } catch (error) {
    return toast.error(error.response.data.message, toastStyles);
  }
};
export const login = async (
  email,
  password,
  toast,
  dispatch,
  navigate,
  socket
) => {
  try {
    if (email === "" || password === "") {
      return toast.error("Please fill the Credentials", toastStyles);
    }
    let res = await axios.post(
      `${baseUrl}/user/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    dispatch(LoginSuccess(res.data.user));
    toast.success(res.data.message);
    socket.current.emit("new-user-joined", res.data.user.username);
    return navigate("/");
  } catch (error) {
    return toast.error(error.response.data.message, toastStyles);
  }
};

export const setProfile = async (
  dispatch,
  avatar,
  city,
  bio,
  caption,
  name,
  hideEmail,
  pprivate
) => {
  if (
    avatar === "" ||
    city === "" ||
    bio === "" ||
    caption === "" ||
    name === ""
  ) {
    return toast.error("Please fill all the Fields!", toastStyles);
  }

  try {
    let res = await axios.put(
      `${baseUrl}/user/setprofile`,
      {
        avatar,
        city,
        bio,
        caption,
        name,
        hideEmail,
        private: pprivate,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(LoadUserSuccess(res.data.user));
    return toast.success(res.data.message);
  } catch (error) {
    return toast.error(error.response.data.message, toastStyles);
  }
};
export const logout = async (dispatch) => {
  try {
    let res = await axios.get(`${baseUrl}/user/logout`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    dispatch(LogoutUserSuccess());
  } catch (error) {
    return toast.error(error.response.data.message);
  }
};

export const suggestions = async (city, setLoading) => {
  try {
    const res = await axios.get(`${baseUrl}/user/suggestions/${city}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    setLoading(false);
    return res.data.users;
  } catch (error) {
    return toast.error(error.response.data.message);
  } finally {
    setLoading(false);
  }
};

export const getUser = async (setLoading, id) => {
  try {
    const res = await axios.get(`${baseUrl}/user/getUser/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    setLoading(false);
    return res.data.user;
  } catch (error) {
    return toast.error(error.response.data.message);
  } finally {
    setLoading(false);
  }
};

// export const addfriend = async (toast, id, setMessage) => {
//   try {
//     let res = await axios.put(
//       `http://localhost:4000/user/addfriend`,
//       { id: User._id },
//       {
//         headers: { "Content-Type": "application/json" },
//         withCredentials: true,
//       }
//     );

//     toast.success(res.data.message);
//     if (res.data.message === `You are now friend with ${User.username}`) {
//       setFriend(true);
//       setFriends(friends + 1);
//     }
//     setFriend;
//     setFriend(false);
//   } catch (error) {
//     return toast.error(error.response.data.message, toastStyles);
//   }
// };

export const acceptRequest = async (toast, id, dispatch, setFriendRequests) => {
  try {
    let res = await axios.put(
      `${baseUrl}/user/acceptrequest`,
      { id: id },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    dispatch(acceptRequestSuccess(res.data.userme));
    setFriendRequests(res.data.userme.friendRequests);
    return toast.success(res.data.message);
  } catch (error) {
    return toast.error(error.response.data.message, toastStyles);
  }
};

export const createChat = async (firstId, secondId) => {
  try {
    let res = await axios.post(
      `${baseUrl}/chat/create`,
      { firstId, secondId },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    return res.data.chat._id;
  } catch (error) {
    return null;
  }
};

export const getAllChats = async (userId) => {
  try {
    let res = await axios.get(`${baseUrl}/chat/allchats/${userId}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return res.data.chats;
  } catch (error) {
    return toast.error(error.response.data.message, toastStyles);
  }
};

export const createMessage = async (
  senderId,
  chatId,
  text,
  replyText,
  createdAt,
  seen,
  image
) => {
  try {
    let res = await axios.post(
      `${baseUrl}/chat/message`,
      { senderId, chatId, text, replyText, createdAt, seen, image },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
  } catch (error) {
    return toast.error(error.response.data.message, toastStyles);
  }
};

export const getAllMessage = async (chatId) => {
  try {
    let res = await axios.get(`${baseUrl}/chat/messages/${chatId}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return res.data.messages;
  } catch (error) {
    return toast.error(error.response.data.message, toastStyles);
  }
};

export const createGroup = async (
  image,
  name,
  caption,
  location,
  bio,
  pprivate,
  navigate
) => {
  if (
    image === "" ||
    name === "" ||
    caption === "" ||
    location === "" ||
    bio === ""
  ) {
    return toast.error("Please fill all the Credentials!", toastStyles);
  }
  if (name.length >= 30) {
    return toast.error(
      "Name should be smaller than 30 characters!",
      toastStyles
    );
  }
  try {
    let res = await axios.post(
      `${baseUrl}/group/create`,
      {
        image,
        name,
        caption,
        location,
        bio,
        private: pprivate,
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    toast.success(res.data.message);
    return navigate("/");
  } catch (error) {
    return toast.error(error.response.data.message, toastStyles);
  }
};

export const getSingleGroup = async (id, setGroup) => {
  try {
    let res = await axios.get(`${baseUrl}/group/single/${id}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    setGroup(res.data.group);
    return res.data.group;
  } catch (error) {
    return toast.error(error.response.data.message, toastStyles);
  }
};

export const getAllGroups = async (id) => {
  try {
    let res = await axios.get(`${baseUrl}/group/${id}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return res.data.groups;
  } catch (error) {
    return toast.error(error.response.data.message, toastStyles);
  }
};

export const addUser = async (id, groupid) => {
  try {
    let res = await axios.get(`${baseUrl}/group/add/${id}/${groupid}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return toast.success(res.data.message);
  } catch (error) {
    return toast.error(error.response.data.message, toastStyles);
  }
};
export const getSug = async () => {
  try {
    let res = await axios.get(`${baseUrl}/group/sug`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return res.data.groups;
  } catch (error) {
    return toast.error(error.response.data.message, toastStyles);
  }
};

export const getSugUsers = async () => {
  try {
    let res = await axios.get(`${baseUrl}/user/sug`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    return res.data.users;
  } catch (error) {
    return toast.error(error.response.data.message, toastStyles);
  }
};

export const removeNotification = async (id) => {
  try {
    let res = await axios.get(`${baseUrl}/user/notification/${id}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return res.data.user;
  } catch (error) {
    return toast.error(error.response.data.message, toastStyles);
  }
};
