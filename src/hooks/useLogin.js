import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const login = (email, password) => {
    setIsPending(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsPending(false);
        dispatch({ type: "LOGIN", payload: user });
      })
      .catch((err) => {
        console.log(err.message);
        setIsPending(false);
        setError(err.message);
      });
  };
  return { login, isPending, error };
};
