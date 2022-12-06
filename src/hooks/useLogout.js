import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setIsPending(true);
    await signOut(auth);
    setIsPending(false);
    dispatch({ type: "LOGOUT" });
  };

  return { logout, isPending };
};
