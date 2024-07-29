import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const fetchUser = async () => {
        const userData = JSON.parse(localStorage.getItem('user'));
        console.log('Fetched user data:', userData);
        setUser(userData);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const login = (userData) => {
        console.log('Logging in user:', userData);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        console.log('Logging out user');
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
