import React, { createContext, useContext, useState, useEffect } from 'react';
import API_BASE_URL from './apiConfig'; 


const AuthContext = createContext();
export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem('isLoggedIn') === 'true';
    });
    const [username, setUsername] = useState(() => localStorage.getItem('username') || '');
    const [token, setToken] = useState(() => localStorage.getItem('token') || '');
    const [kh, setKh] = useState(null); 
    const [phone, setPhone] = useState(null); 
    const [created_at, setTime] = useState(null);
    const [balance, setBalance] = useState(0); 

    const resetKh = () => {
        if (!isLoggedIn) {
            setKh(null);
        }
    };

    useEffect(() => {
        localStorage.setItem('isLoggedIn', isLoggedIn);
        localStorage.setItem('username', username);
        localStorage.setItem('token', token);
    }, [isLoggedIn, username, token]);
    
    useEffect(() => {
        if (isLoggedIn) {
            updateUserData();
        }
    }, [isLoggedIn]);

    const updateUserData = () => {
        if (isLoggedIn && token && username) { 
            fetch(`${API_BASE_URL}/api/auth/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ username })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to verify user');
                }
                return response.json();
            })
            .then(data => {
                setKh(data.kh);
                setPhone(data.phone);
                setTime(data.created_at);
                setBalance(data.balance);
            })
            .catch(error => console.error('Error fetching user data:', error));
        }
    };
    

    const resetAllData = () => {
        setIsLoggedIn(false);
        setUsername('');
        setToken('');
        setKh(null);
        updateUserData(); 
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        localStorage.removeItem('token');
    };

    const login = (username, token) => {
        setIsLoggedIn(true);
        setUsername(username);
        setToken(token);
        resetKh(); 
        updateUserData(); 
    };
    
    
    const logout = () => {
        resetAllData();
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, kh, phone, created_at, balance, updateUserData, resetKh, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
