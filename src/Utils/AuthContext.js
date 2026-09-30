import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        const saved = localStorage.getItem('apnafashion_user');
        return saved ? JSON.parse(saved) : null;
    });

    const [usersDB, setUsersDB] = useState(() => {
        const saved = localStorage.getItem('apnafashion_users_db');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem('apnafashion_user', JSON.stringify(currentUser));
        } else {
            localStorage.removeItem('apnafashion_user');
        }
    }, [currentUser]);

    useEffect(() => {
        localStorage.setItem('apnafashion_users_db', JSON.stringify(usersDB));
    }, [usersDB]);

    const signup = (name, email, password) => {
        if (usersDB.find(u => u.email === email)) {
            return false;
        }
        const newUser = {
            id: 'USR-' + Math.floor(Math.random() * 900000),
            name,
            email,
            password // In a real app, never store plain text passwords!
        };
        setUsersDB([...usersDB, newUser]);
        setCurrentUser({ id: newUser.id, name: newUser.name, email: newUser.email });
        return true;
    };

    const login = (email, password) => {
        const user = usersDB.find(u => u.email === email && u.password === password);
        if (!user) {
            return false;
        }
        setCurrentUser({ id: user.id, name: user.name, email: user.email });
        return true;
    };

    const logout = () => {
        setCurrentUser(null);
    };

    const value = {
        currentUser,
        signup, register: signup,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
