import axios from "axios";

import { getFingerprint } from "../../services/identity.service";

const getPresignedUrl = async (fileName) => {
    const fingerprint = await getFingerprint();
    const response = await axios.post(process.env.REACT_APP_API_URL + "/file", {
        params: {
            fingerprint: fingerprint,
            fileName: fileName
        }
    });

    return response.data
}

const uploadFile = async (file) => {
    const presignedUrlResponse = await getPresignedUrl(file.name);
    const { fields, url } = presignedUrlResponse;

    const formData = new FormData();
    formData.append('file', file);

    Object.keys(fields).forEach(key => {
        formData.append(key, fields[key]);
    });

    const response = await axios.post(url, formData);
    console.log("file uploaded successfully", response);
}

export { getPresignedUrl, uploadFile };

