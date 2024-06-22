import React, { useState } from "react";
import styles from "./Search.module.css";
import SearchIcon from "@mui/icons-material/Search";
import SearchResults from "../SearchResults/SearchResults";
import axios from "axios";
const Search = () => {
  const [username, setUsername] = useState("");
  const [results, setResults] = useState([]);
  return (
    <div className={styles.main}>
      <form>
        <input
          type="search"
          placeholder="Search People"
          onChange={async (e) => {
            setUsername(e.target.value);
            if (e.target.value !== "") {
              let res = await axios.get(
                `http://localhost:4000/user/search/${e.target.value}`
              );
              return setResults(res.data);
            } else {
              return null;
            }
          }}
        />
        <button type="submit" className={styles.btn}>
          <SearchIcon />
        </button>
      </form>
      {username !== "" && (
        <SearchResults results={results} setUsername={setUsername} />
      )}
    </div>
  );
};

export default Search;
