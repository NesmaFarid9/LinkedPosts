import { createContext, useEffect, useState } from "react";
import { getLoggedUserDataApi } from "../Services/authServices";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") != null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getLoggedUserData() {
    try {
      const response = await getLoggedUserDataApi();
      console.log("🔥 getLoggedUserDataApi response:", response);

      // Try common shapes: response.user, response.data.user, response.data
      const user = response?.user || response?.data?.user || response?.data || null;
      console.log("🔎 extracted user:", user);

      if (user && (user._id || user.id)) {
        // normalize to _id
        user._id = user._id || user.id;
        setUserData(user);
        setIsLoggedIn(true);
      } else {
        setUserData(null);
        setIsLoggedIn(false);
      }
    } catch (err) {
      console.error("❌ getLoggedUserData error:", err);
      setUserData(null);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // start loading user
      getLoggedUserData();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      isLoggedIn, setIsLoggedIn,
      userData, setUserData,
      getLoggedUserData, loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}
