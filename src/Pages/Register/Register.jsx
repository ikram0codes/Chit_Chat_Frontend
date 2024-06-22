import React, { useState } from "react";
import styles from "./Register.module.css";
import logo from "../../assets/logo.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { submit } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { ColorRing } from "react-loader-spinner";

const Register = () => {
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPAuth, setShowpAuth] = useState(false);
  const capital = document.getElementById("capital");
  const length = document.getElementById("length");
  const special = document.getElementById("special");

  return isAuth ? (
    <Navigate to={"/"} />
  ) : (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <img src={logo} alt="Chit Chat" />
          <h1>Chit Chat</h1>
        </div>
        <form
          onSubmit={(e) => {
            setLoading(true);
            submit(e, username, email, password, toast, dispatch, navigate);
            setLoading(false);
          }}
        >
          <input
            autoFocus
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            autoFocus
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            autoFocus
            id="pass"
            type="password"
            onClick={() => {
              setShowpAuth(true);
            }}
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
              let hasCapital = /[A-Z]/.test(e.target.value);
              const specialCharRegex =
                /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(e.target.value);
              let validLength = password.length > 8;
              if (hasCapital) {
                capital.classList.add("done");
                capital.classList.remove("incomplete");
              } else {
                capital.classList.remove("done");
                capital.classList.add("incomplete");
              }
              if (specialCharRegex) {
                special.classList.add("done");
                special.classList.remove("incomplete");
              } else {
                special.classList.remove("done");
                special.classList.add("incomplete");
              }
              if (validLength) {
                length.classList.add("done");
                length.classList.remove("incomplete");
              } else {
                length.classList.remove("done");
                length.classList.add("incomplete");
              }
            }}
          />
          <div
            className={styles.passAuth}
            style={{ visibility: showPAuth === true ? "visible" : "hidden" }}
          >
            <ul>
              <li className="incomplete" id="length">
                Password Must Be Greater Than 8 Character
              </li>
              <li className="incomplete" id="capital">
                Password Must Contain A Capital Letter
              </li>
              <li className="incomplete" id="special">
                Password Must Contain A Special Character
              </li>
            </ul>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? (
              <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#007FFF", "#007FFF", "#007FFF", "#007FFF", "#007FFF"]}
              />
            ) : (
              "SIGN UP"
            )}
          </button>
        </form>
        <div className={styles.alt}>
          <p>
            Already have an Account ? <Link to={"/login"}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
