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

      <div style={{ maxWidth: '600px', margin: '40px auto', color: TEXT_COLOR }}>
        {history.length === 0 ? <>

          <h1 style={{
            textAlign: 'center',
            color: PRIMARY_COLOR,
            marginBottom: '20px',
            fontSize: '2.5em'
          }}>
            Search Beyond Words
          </h1>
          <p style={{
            textAlign: 'center',
            color: '#666',
            marginBottom: '40px',
            fontSize: '1.1em',
            lineHeight: '1.5'
          }}>
            Discover the world in a way words alone can't capture!
          </p>

          <SearchInput />
        </> : null}
        {history.length > 0 ? <SearchThread /> : null}

      </div>
    </div>
  );
}

export default App;
