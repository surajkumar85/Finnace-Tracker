import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { isAuthReady, user } = useAuthContext();

  return (
    <div className="app">
      {isAuthReady && (
        <>
          <Navbar />
          <div className="page">
            <Routes>
              <Route
                path="/"
                element={
                  user ? <Navigate to="/home" /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/home"
                element={!user ? <Navigate to="/login" /> : <Home />}
              />
              <Route
                path="/signup"
                element={user ? <Navigate to="/home" /> : <Signup />}
              />
              <Route
                path="/login"
                element={user ? <Navigate to="/home" /> : <Login />}
              />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
