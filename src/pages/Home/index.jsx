import React from "react";

import styles from "./styles.module.css";

import SearchView from "./search";
import LibraryView from "./library";

const HomePage = () => {
  return (
    <div className={styles.homeContainer}>
      <SearchView />
      <LibraryView />
    </div>
  );
};

export default HomePage;
