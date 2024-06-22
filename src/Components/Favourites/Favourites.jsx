import React, { useState } from "react";
import styles from "./Favourites.module.css";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
const Favourites = () => {
  const [favourite, setFavourite] = useState(true);
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.head} style={{ textAlign: "left" }}>
          Favourites
        </h1>
        <span>7</span>
      </div>
      <div className={styles.favourties}>
        <div className={styles.profile}>
          <div className={styles.img}>
            <img
              src={
                "https://i.pinimg.com/564x/bc/ec/91/bcec9148ec1180f5a3ef6ef5605231de.jpg"
              }
              alt="Profile Image"
            />
          </div>
          <div className={styles.txt}>
            <h1>ikram0pakitan_7</h1>
            <p>Find The inner most of yourself!</p>
          </div>
          <div className={styles.panel}>
            <button
              onClick={() => {
                setFavourite(!favourite);
              }}
            >
              {favourite === true ? (
                <StarIcon className={styles.selected} />
              ) : (
                <StarBorderIcon />
              )}
            </button>
          </div>
        </div>
        <div className={styles.profile}>
          <div className={styles.img}>
            <img
              src={
                "https://i.pinimg.com/564x/c9/52/7b/c9527b398fe2f9f073abcfa3a3ccb2c4.jpg"
              }
              alt="Profile Image"
            />
          </div>
          <div className={styles.txt}>
            <h1>Sheikh_333</h1>
            <p>Munkar Pare Pare</p>
          </div>
          <div className={styles.panel}>
            <button>
              <StarBorderIcon />
            </button>
          </div>
        </div>
        <div className={styles.profile}>
          <div className={styles.img}>
            <img
              src={
                "https://i.pinimg.com/736x/d5/28/58/d52858cf70a1dbdadd69362482f3ee21.jpg"
              }
              alt="Profile Image"
            />
          </div>
          <div className={styles.txt}>
            <h1>Aitizaz.404</h1>
            <p>Shining Stone is not always diamond</p>
          </div>
          <div className={styles.panel}>
            {" "}
            <button>
              <StarBorderIcon />
            </button>
          </div>
        </div>
        <div className={styles.profile}>
          <div className={styles.img}>
            <img
              src={
                "https://i.pinimg.com/736x/e5/5b/0b/e55b0bab7ea0356694676265789ccfc1.jpg"
              }
              alt="Profile Image"
            />
          </div>
          <div className={styles.txt}>
            <h1>Khani_304</h1>
            <p>Auqat ech reh oye__</p>
          </div>
          <div className={styles.panel}>
            <button>
              <StarBorderIcon />
            </button>
          </div>
        </div>
        <div className={styles.profile}>
          <div className={styles.img}>
            <img
              src={
                "https://i.pinimg.com/564x/bc/ec/91/bcec9148ec1180f5a3ef6ef5605231de.jpg"
              }
              alt="Profile Image"
            />
          </div>
          <div className={styles.txt}>
            <h1>maybe_raheel_3</h1>
            <p>Do not Disturb!</p>
          </div>
          <div className={styles.panel}>
            <button>
              <StarBorderIcon />
            </button>
          </div>
        </div>{" "}
        <div className={styles.profile}>
          <div className={styles.img}>
            <img
              src={
                "https://i.pinimg.com/originals/6b/35/a5/6b35a574329d9d5aca30418f644d4d02.jpg"
              }
              alt="Profile Image"
            />
          </div>
          <div className={styles.txt}>
            <h1>exb4d-ur-rehman</h1>
            <p>Piss of nigga!</p>
          </div>
          <div className={styles.panel}>
            <button>
              <StarBorderIcon />
            </button>
          </div>
        </div>{" "}
        <div className={styles.profile}>
          <div className={styles.img}>
            <img
              src={
                "https://i.pinimg.com/736x/e3/29/20/e32920be7fe7748df4cd09c372b14a78.jpg"
              }
              alt="Profile Image"
            />
          </div>
          <div className={styles.txt}>
            <h1>roha.malik_3</h1>
            <p>I am just beautiful</p>
          </div>
          <div className={styles.panel}>
            {" "}
            <button>
              <StarBorderIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favourites;
