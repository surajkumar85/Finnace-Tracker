import React from "react";
import "./TrackList.css";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";

function TrackList({ uid }) {
  const { removeDocument } = useFirestore("trackers");
  const { trackers, isPending, error } = useCollection(
    "trackers",
    ["uid", "==", uid],
    ["createdAt", "desc"]
  );
  return (
    <div className="trackers__list">
      {isPending && <h1>Loading data...</h1>}
      {error && <h1>{error}</h1>}
      {trackers &&
        trackers.map((tracker) => (
          <div key={tracker.id} className="tracker__list">
            <h1>{tracker.forWhat}</h1>
            <p>${tracker.amount}</p>
            <p className="delete" onClick={() => removeDocument(tracker.id)}>
              X
            </p>
          </div>
        ))}
    </div>
  );
}

export default TrackList;
