import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setSearchQuery, setSelectedFile, addToHistory } from '../../store/searchSlice';


import { uploadFile } from '../amazon/FileUploader';

import "../../styles/search/SearchInput.css";

const SearchInput = () => {

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

    const handleSearch = (query) => {
        dispatch(setSearchQuery(query));
    };

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

    return (<>
        <h1 className='search-input-title'>Search Beyond Words </h1>
        <p className='search-input-sub-title'> Discover the world in a way words alone can't capture! </p>

        <div className='search-input-container'>
            <div className='search-input-query-container'>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            if (searchQuery.trim() === '') {
                                alert('Please enter a valid query');
                                return;
                            }

                            if (selectedFile == null) {
                                alert('Please upload a file first');
                                return;
                            }

                            dispatch(addToHistory({ id: Date.now(), question: searchQuery, answer: 'sample answer' }));
                            dispatch(setSearchQuery(''));
                        }
                    }}
                    placeholder="Know what is in your file?"
                    className='search-input-query'
                />

                <input
                    type="file"
                    onChange={handleFileInput}
                    style={{ display: 'none' }}
                    id="fileInput"
                    accept=".pdf,.doc,.docx,.mp4,.jpg,.jpeg,.png,.gif"
                    key={selectedFile ? selectedFile.name : ''}
                />

                <label htmlFor="fileInput" className='search-input-label'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        style={{ width: '28px', height: '28px' }}
                    >
                        <path
                            d="M12 4L12 16M12 4L8 8M12 4L16 8M4 17L4 19C4 19.5523 4.44772 20 5 20L19 20C19.5523 20 20 19.5523 20 19L20 17"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </label>
            </div>

            {selectedFile && (
                <div className='search-input-file-container'>
                    <div className='search-input-file-name'>
                        {selectedFile.name}
                    </div>

                    <button onClick={() => dispatch(setSelectedFile(null))} className='search-input-clear-button'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" style={{ width: '20px', height: '20px' }}>
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    </>);
};

export default SearchInput;
