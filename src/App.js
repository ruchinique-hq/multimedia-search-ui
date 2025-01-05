import './App.css';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import SearchInput from './components/search/SearchInput';
import SearchThread from './components/search/SearchThread';

const PRIMARY_COLOR = '#ED4331';
const TEXT_COLOR = '#111';


function App() {

  const history = useSelector(state => state.search.history);


  return (
    <div className="App">
      <div className='App-Container'>
        {history.length === 0 ? <SearchInput /> : null}
        {history.length > 0 ? <SearchThread /> : null}
      </div>
    </div>
  );
}

export default App;
