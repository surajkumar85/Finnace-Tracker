import { createContext, useEffect, useReducer } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGOUT":
      return { ...state, user: null };
    case "LOGIN":
      return { ...state, user: action.payload };
    case "SIGNUP":
      return { ...state, user: action.payload };
    case "ACTIVE_USER":
      return { ...state, isAuthReady: true, user: action.payload };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthReady: false,
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch({ type: "ACTIVE_USER", payload: user });
    });
    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
