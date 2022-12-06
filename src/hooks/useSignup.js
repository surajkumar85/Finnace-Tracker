import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = (email, password, dName) => {
    setIsPending(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCrediential) => {
        const user = userCrediential.user;
        updateProfile(user, { displayName: dName }).then(() => {
          dispatch({ type: "SIGNUP", payload: user });
          setIsPending(false);
        });
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
        setError(error.message);
      });
  };

  return { signup, isPending, error };
};
