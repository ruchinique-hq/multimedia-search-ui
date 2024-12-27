import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setSearchQuery, setSelectedFile, addToHistory } from '../../store/searchSlice';


import { uploadFile } from '../amazon/FileUploader';

const SearchInput = () => {
    const PRIMARY_COLOR = '#ED4331';
    const TEXT_COLOR = '#111';

    const dispatch = useDispatch();

    const selectedFile = useSelector(state => state.search.selectedFile);
    const searchQuery = useSelector(state => state.search.searchQuery);

    useEffect(() => {
        if (selectedFile) {
            async function upload() {
                const response = await uploadFile(selectedFile);
                if (response != null) {
                }
            }
            upload();
        }
    }, [selectedFile]);

    const handleFileInput = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Check file size (10MB = 10 * 1024 * 1024 bytes)
        const maxSize = 10 * 1024 * 1024;
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

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            padding: '20px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            border: '1px solid #eee'
        }}>
            <div style={{
                display: 'flex',
                gap: '10px'
            }}>
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
                    style={{
                        padding: '16px',
                        fontSize: '16px',
                        border: `1px solid ${PRIMARY_COLOR}`,
                        borderRadius: '4px',
                        flex: 1,
                        boxSizing: 'border-box',
                        outline: 'none',
                        color: TEXT_COLOR,
                        height: '56px'
                    }}
                />
                <input
                    type="file"
                    onChange={handleFileInput}
                    style={{ display: 'none' }}
                    id="fileInput"
                    accept=".pdf,.doc,.docx,.mp4,.jpg,.jpeg,.png,.gif"
                />

                <label
                    htmlFor="fileInput"
                    style={{
                        padding: '16px',
                        backgroundColor: PRIMARY_COLOR,
                        color: 'white',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '20px',
                        width: '25px',
                        height: '25px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
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
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: PRIMARY_COLOR,
                    justifyContent: 'space-between'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        {selectedFile.name.endsWith('.pdf') && (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '24px', height: '24px' }}>
                                <path d="M5 2C3.89543 2 3 2.89543 3 4V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V8L15 2H5Z" stroke="currentColor" strokeWidth="2" />
                                <path d="M15 2V8H21" stroke="currentColor" strokeWidth="2" />
                                <path d="M7 13H17" stroke="currentColor" strokeWidth="2" />
                                <path d="M7 17H17" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        )}
                        {selectedFile.name.match(/\.(doc|docx)$/) && (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '24px', height: '24px' }}>
                                <path d="M4 4C4 2.89543 4.89543 2 6 2H14L20 8V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4Z" stroke="currentColor" strokeWidth="2" />
                                <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        )}
                        {selectedFile.name.endsWith('.mp4') && (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: '24px', height: '24px' }}>
                                <path d="M4 4C4 2.89543 4.89543 2 6 2H18C19.1046 2 20 2.89543 20 4V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4Z" stroke="currentColor" strokeWidth="2" />
                                <path d="M10 8L16 12L10 16V8Z" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        )}
                        {selectedFile.name}
                    </div>
                    <button
                        onClick={() => setSelectedFile(null)}
                        style={{
                            background: 'none',
                            border: 'none',
                            padding: '4px',
                            cursor: 'pointer',
                            color: PRIMARY_COLOR,
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" style={{ width: '20px', height: '20px' }}>
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};

export default SearchInput;
