import React from "react";
import styles from "./Loader.module.css";
import { Bars } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className={styles.main}>
      <div className={styles.loader}>
        <Bars
          height="100"
          width="100"
          color="#9617C9"
          ariaLabel="bars-loading"
          visible={true}
        />{" "}
      </div>
      <div className={styles.txt}>
        <h1>
          <span style={{ margin: "0px 5px" }}>&copy;</span>A Production of IKRAM
          KHAN
        </h1>
      </div>
    </div>
  );
};

export default Loader;
