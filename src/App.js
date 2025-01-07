import "./App.css";
import React from "react";
import { useSelector } from "react-redux";

import Home from "./pages/Home/Home";

function App() {
  const history = useSelector((state) => state.search.history);

  return (
    <div className="app">
      {/* <div className="search">
        {history.length === 0 ? <SearchInput /> : null}
        {history.length > 0 ? <SearchThread /> : null}
      </div>
      <div className="library">
        <Library />
      </div> */}

      <Home />
    </div>
  );
}

export default App;
