import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
import { useSignup } from "../../hooks/useSignup";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dName, setDName] = useState("");
  const { signup, isPending, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password, dName);
    await signup(email, password, dName);
  };

  return (
    <div className="signup">
      <div className="form__box">
        <h1 className="form__heading">Signup</h1>
        <p className="form__subheading">
          Allready have an account? <Link to="/login">Login</Link> here.
        </p>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__group">
            <label htmlFor="email" className="form__label">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="form__input"
              id="email"
            />
          </div>
          <div className="form__group">
            <label htmlFor="password" className="form__label">
              Password
            </label>
            <input
              type="password"
              required
              className="form__input"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form__group">
            <label htmlFor="dname" className="form__label">
              Display Name
            </label>
            <input
              value={dName}
              onChange={(e) => setDName(e.target.value)}
              type="text"
              required
              className="form__input"
              id="dname"
            />
          </div>
          {!isPending && <button className="form__btn">Signup</button>}
          {isPending && (
            <button className="form__btn" disabled>
              Signing...
            </button>
          )}
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Signup;
