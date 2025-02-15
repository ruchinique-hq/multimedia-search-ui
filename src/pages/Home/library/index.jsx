import React, { useState, useRef, useEffect } from "react";
import styles from "./styles.module.css";
import { faPaperclip, faImage } from "@fortawesome/free-solid-svg-icons";

import { uploadFile } from "../../../components/amazon/FileUploader"

import Icon from "../../../components/icon/Icon";

const LibraryView = () => {
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
  }, [preview]);

  useEffect(() => {

    if (selectedFile) {
      async function upload() {
        const response = await uploadFile(selectedFile);
        if (response != null) {
        }
      } 

      upload();
    }

  }, [selectedFile])

  const handleUpload = async (event) => {

    const file = event.target.files?.[0];
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

    setSelectedFile(file);

  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    // const file = event.dataTransfer.files[0];
    // if (file) {
    //   setSelectedFile(file);

    //   if (file.type.startsWith("image/")) {
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //       setPreview(reader.result);
    //     };
    //     reader.readAsDataURL(file);
    //   } else {
    //     setPreview(null);
    //   }
    // }

  };

  const handleFileChange = (event) => {
    handleUpload(event);
  };

  const triggerFileInput = () => {
    inputRef.current.click();
  };

  return (
    <div className={styles.libraryContainer}>
      <h1 className={styles.title}>Library</h1>
      <div className={styles.samplesContainer}>
        <h2 className={styles.samplesTitle}>Samples</h2>
      </div>
      <div className={styles.uploadContainer}>
        <h2 className={styles.uploadTitle}>Uploads</h2>
        <div
          className={styles.dragContainer}
          onClick={triggerFileInput}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Icon icon={faImage} color={"rgba(0, 0, 0, 0.4)"} size={"3x"} />
          <label
            className={styles.attachAssetText}
            style={{ cursor: "pointer" }}
          >
            Drag or click to upload a file
          </label>
          <input
            type="file"
            id="file"
            name="file"
            multiple
            style={{ display: "none" }}
            onChange={handleFileChange}
            ref={inputRef}
          />
        </div>
      </div>
    </div>
  );
};

export default LibraryView;
