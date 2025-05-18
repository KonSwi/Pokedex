import { createContext, useState, useContext, useEffect } from "react";
import {
  saveUser as lsSaveUser,
  getUser as lsGetUser,
  removeUser as lsRemoveUser,
} from "../services/localStorageService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = lsGetUser();
    if (storedUser) {
      fetch(`http://localhost:3000/users/${storedUser.id}`)
        .then((res) => {
          if (!res.ok) {
            lsRemoveUser();
            setUser(null);
            return null;
          }
          return res.json();
        })
        .then((data) => {
          if (data) {
            setUser(data);
          }
        })
        .catch((error) => {
          console.error("Błąd podczas weryfikacji użytkownika:", error);
          lsRemoveUser();
          setUser(null);
        });
    }
  }, []);

  useEffect(() => {
    if (user) {
      lsSaveUser(user);
    } else {
      lsRemoveUser();
    }
  }, [user]);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
