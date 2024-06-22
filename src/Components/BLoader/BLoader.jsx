import React from "react";
import styles from "./BLoader.module.css";
import { ColorRing } from "react-loader-spinner";
const BLoader = () => {
  return (
    <div className={styles.main}>
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperClass="color-ring-wrapper"
        colors={["#7A19A1", "#007FFF", "#73C1E0", "#7A19A1", "#007FFF"]}
      />
    </div>
  );
};

export default BLoader;
