import { createContext, useEffect, useState } from "react";
import { getLoggedUserDataApi } from "../Services/authServices";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") != null);
    const [userData, setUserData] = useState(null);

    async function getLoggedUserData() {
        const response = await getLoggedUserDataApi();
        if (response?.message) {
        setUserData(response.user);
        }
    }

    useEffect(() => {
        getLoggedUserData();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userData, setUserData, getLoggedUserData }}>
        {children}
        </AuthContext.Provider>
    );
}
