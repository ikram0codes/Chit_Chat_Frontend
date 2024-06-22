import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import styles from "./Login.module.css";
import { login } from "../../api";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";

const Login = ({ socket }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <img src={logo} alt="Chit Chat" />
          <h1>Chit Chat</h1>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            await login(email, password, toast, dispatch, navigate, socket);
            setLoading(false);
          }}
        >
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
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
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
              "LOGIN"
            )}
          </button>
        </form>
        <div className={styles.alt}>
          <p>
            Don't have an Account ? <Link to={"/signup"}>SignUp</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
