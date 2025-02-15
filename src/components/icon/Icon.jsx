import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = ({ icon, size, color }) => {
    return (
        <FontAwesomeIcon icon={icon} size={size} color={color} />
    );
};

export default Icon;
