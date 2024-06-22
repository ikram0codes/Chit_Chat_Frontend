import React from "react";
import styles from "./SearchResults.module.css";
import { useDispatch } from "react-redux";
import { profilePage } from "../../redux/primary";

const SearchResults = ({ results, setUsername }) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.main}>
      <div className={styles.profiles}>
        {results.length === 0 ? (
          <div className="alt">
            <h1>No Users Found!</h1>
          </div>
        ) : (
          results.map((user) => {
            return (
              <div
                className={styles.profile}
                key={user._id}
                onClick={() => {
                  dispatch(profilePage(user._id));
                  setUsername("");
                }}
              >
                <img src={user.avatar} alt={user.username} />
                <h1>{user.username}</h1>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SearchResults;
