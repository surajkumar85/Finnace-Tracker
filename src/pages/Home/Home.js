import React from "react";
import TrackerForm from "../../components/TrackerForm/TrackerForm";
import TrackList from "../../components/TrackList/TrackList";
import "./Home.css";
import { useAuthContext } from "../../hooks/useAuthContext";
// import { useAuthContext } from "./useAuthContext";

function Home() {
  const { user } = useAuthContext();
  return (
    <div className="home">
      <TrackList uid={user.uid} />
      <TrackerForm uid={user.uid} />
    </div>
  );
}

export default Home;
