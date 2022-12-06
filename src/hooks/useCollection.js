import { db } from "../firebase/firebaseConfig";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";

export const useCollection = (collectionName, _query, _orderBy) => {
  const [trackers, setTrackers] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const queryRef = useRef(_query);
  const orderByRef = useRef(_orderBy);
  // console.log(queryRef);
  useEffect(() => {
    let ref = collection(db, collectionName);
    if (queryRef) {
      ref = query(ref, where(...queryRef.current));
    }
    if (orderBy) {
      ref = query(ref, orderBy(...orderByRef.current));
    }
    setIsPending(true);
    const unsub = onSnapshot(
      ref,
      (data) => {
        const results = [];
        if (!data.empty) {
          data.docs.map((tracker) =>
            results.push({ ...tracker.data(), id: tracker.id })
          );
        }
        setIsPending(false);
        setTrackers(results);
        setError(null);
      },
      (err) => {
        setIsPending(false);
        setError(err.message);
      }
    );
    return () => unsub();
  }, [collectionName]);

  return { trackers, isPending, error };
};
