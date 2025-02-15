import axios from "axios";

import { getFingerprint } from "../../services/identity.service";

const getPresignedUrl = async (fingerprint, file) => {
    const data = {
        fingerprint: fingerprint,
        file_name: file.name,
        content_type: file.type
    }

    const response = await axios.post(process.env.REACT_APP_API_URL + "/file/initialize", data);
    return response.data
}

const uploadFile = async (file) => {
    try {

        console.log("uploading file: ", file);

        const fingerprint = await getFingerprint();
        
        const presignedUrlResponse = await getPresignedUrl(fingerprint, file);
        const { fields, url } = presignedUrlResponse;
    
        const formData = new FormData();
        Object.keys(fields).forEach(key => {
            formData.append(key, fields[key]);
        });

        formData.append('file', file);
    
        const response = await axios.post(url, formData);
        if (response.status >= 200 && response.status <= 300) {
            axios.post(process.env.REACT_APP_API_URL + "/file/process", { 
                fingerprint: fingerprint,
                key: fields['key'],
                
            });
            return true;
        } else {
            console.log("failed to upload file", response.status, response.statusText);
        }

    } catch (error) {
        console.log("failed to upload file", error.message);
    }

    return false;
}

export { getPresignedUrl, uploadFile };

