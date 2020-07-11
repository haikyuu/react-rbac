import React, { useEffect, useState, useCallback } from "react";
import { UserT, UserContextT } from "../utils/types";

const defaultContext: UserContextT = {
  user: { token: undefined },
  logout: () => {}
};
export const UserContext = React.createContext<UserContextT>(defaultContext);

export default function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState<UserT>(defaultContext.user);
  const logout = useCallback(() => {
    localStorage.removeItem("user");
    setCurrentUser(defaultContext.user);
  }, [setCurrentUser]);
  useEffect(() => {
    setInterval(() => {
      // if user is not logged in, redirect back  to Login page and show a message
      const jsonUser = localStorage.getItem("user");
      if (jsonUser) {
        const user: UserT = JSON.parse(jsonUser);
        console.log("jsonuser", user);
        setCurrentUser(user || defaultContext.user);
      } else {
        setCurrentUser(defaultContext.user);
      }
    }, 5000);
  }, []);
  return (
    <UserContext.Provider value={{ user: currentUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}
