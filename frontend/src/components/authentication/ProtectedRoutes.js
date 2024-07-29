import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    if (!user) {
        navigate('/');
        return;
    }

    return children;
};

export default ProtectedRoute;
