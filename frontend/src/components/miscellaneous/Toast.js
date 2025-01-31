import React from 'react';

const Toast = ({ message, type }) => {
    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

    return (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 ${bgColor} text-white px-4 py-2 rounded shadow-lg z-50`}>
            {message}
        </div>
    );
};

export default Toast;
