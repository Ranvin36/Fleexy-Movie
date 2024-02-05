import { useContext, useState, useEffect, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe()
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
