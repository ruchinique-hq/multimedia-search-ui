import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setSelectedFile } from '../../store/searchSlice';

import "../../styles/Library.css";

function Library() {

    const dispatch = useDispatch();
    const selectedFile = useSelector(state => state.search.selectedFile);

    
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

    return (
        <div className="library-container">
            <h2 className="title">Library</h2>
            <div className="section">
                <h5 className="section-title">Samples</h5>
            </div>
            <div className="section">
                <h5 className="section-title">Uploads</h5>
                
                <div className="upload-container">
                    
                    <input
                        type="file"
                        onChange={handleFileInput}
                        id="fileInput"
                        accept=".pdf,.doc,.docx,.mp4,.jpg,.jpeg,.png,.gif"
                    />

                </div>
            </div>
        </div>
    );
}

export default Library;
