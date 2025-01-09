import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import Icon from "./icon/Icon";

import { setSearchQuery, setSelectedFile, addToHistory } from "../store/searchSlice";

import { uploadFile } from "./amazon/FileUploader";

import { getFingerprint } from "../services/identity.service";

import "../styles/Search.css";

function Search() {

    const dispatch = useDispatch();

    const selectedFile = useSelector(state => state.search.selectedFile);
    const searchQuery = useSelector(state => state.search.searchQuery);

    useEffect(() => {
        initializeFileUpload();
    }, [selectedFile]);

    const handleFileInput = (e) => {

        const file = e.target.files?.[0];
        if (!file) return;

        // Check file size (10MB = 10 * 1024 * 1024 bytes)
        const maxSize = 100 * 1024 * 1024;
        if (file.size > maxSize) {
            alert('File size must be less than 10MB');
            return;
        }

        // Check file type
        const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'video/mp4',
            'image/jpeg',
            'image/png',
            'image/gif'
        ];

        if (!allowedTypes.includes(file.type)) {
            alert('Only PDF, Word documents, MP4 files, and images (JPEG, PNG, GIF) are allowed');
            return;
        }

        dispatch(setSelectedFile(file));
    }

    const handleSearchQuery = (query) => {
        dispatch(setSearchQuery(query));
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            if (searchQuery.trim() === '') {
                alert("please enter a query to search");
                return;
            }

            if (selectedFile == null) {
                alert("please select a file to search");
                return;
            }
        }
    }

    const initializeFileUpload = () => {
        if (selectedFile) {
            async function upload() {
                const response = await uploadFile(selectedFile);
                if (response != null) {
                }
            }
            upload();
        }
    }


    return (
        <div className="search-container">

            <div className="search-input-container">

                <div className='search-input-title'>Search Beyond Words</div>
                <div className='search-input-sub-title'>Discover the world in a way words alone can't capture!</div>

                <div className="search-query-container">

                    <div className="search-query">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => handleSearchQuery(e.target.value)}
                            onKeyDown={(e) => handleSearch(e)}
                            placeholder="Know what is in your file?"
                            className="search-query-input" />

                        <button className="search-query-button" onClick={initializeFileUpload}> 
                            <Icon icon={faPaperPlane} size="lg" color="black" />
                        </button>

                    </div>

                </div>
            </div>

            <div className="search-thread-container">
            </div>
        </div>
    );
}

export default Search;
