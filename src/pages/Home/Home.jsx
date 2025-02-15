import React from 'react';

import Library from "../../components/library/Library";
import Search from "../../components/Search";

import "../../styles/Home.css";

function Home() {
    return (
        <div className="home-container">
            <div className="section left-section">
                <Search />
            </div>
            <div className="section right-section">
                <Library />
            </div>
        </div>
    );
}

export default Home;
