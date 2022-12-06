import { useReducer } from "react";
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { db, timestamp } from "../firebase/firebaseConfig";

let initialState = {
  isPending: false,
  error: null,
  document: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { ...state, isPending: true };
    case "ERROR":
      return { ...state, error: action.payload };
    case "ADD_DOCUMENT":
      return {
        success: true,
        document: action.payload,
        isPending: false,
        error: null,
      };
    case "DELETE":
      return { ...state, isPending: false, error: null, document: null };
    default:
      return state;
  }
};

export const useFirestore = (collectionName) => {
  const [state, dispatch] = useReducer(firestoreReducer, initialState);
  const collectionRef = collection(db, collectionName);
  //add an document
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const createdAt = timestamp;
      const docRef = await addDoc(collectionRef, { ...doc, createdAt });
      dispatch({ type: "ADD_DOCUMENT", payload: docRef });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message });
    }
  };
  //remove and document
  const removeDocument = async (id) => {
    await deleteDoc(doc(db, collectionName, id));
    dispatch({ type: "DELETE" });
  };
  return { addDocument, removeDocument, ...state };
};
