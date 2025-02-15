import React, { useState, useRef } from "react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import _ from 'lodash';

import Icon from "../../../components/icon/Icon";
import styles from "./styles.module.css";

const SearchView = () => {
  const textAreaRef = useRef(null);
  const [query, setQuery] = useState("");

  const handleTextareaChange = (event) => {
    const textarea = textAreaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;

    setQuery(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = (event) => {
    textAreaRef.current.value = ''
    setQuery("");
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>Search beyond words</h1>
        <p className={styles.description}>
          Discover the world in a way words can't alone capture!
        </p>
      </div>
      <form className={styles.inputContainer} onSubmit={handleSubmit}>
        <textarea
          className={styles.input}
          placeholder="Know what is in your file?"
          value={query}
          rows="1"
          ref={textAreaRef}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyPress}
        />
        <button type="submit" className={styles.submitButton} onClick={handleSubmit}>
          <Icon icon={faPaperPlane} size="lg" color={_.isEmpty(query) ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.6)"} />
        </button>
      </form>
    </div>
  );
};

export default SearchView;