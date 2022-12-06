import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { useLogin } from "../../hooks/useLogin";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="login">
      <div className="form__box">
        <h1 className="form__heading">Login form</h1>
        <p className="form__subheading">
          Doesn't have an account? <Link to="/signup">Signup</Link> here.
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              className="form__input"
              id="password"
            />
          </div>
          {!isPending && <button className="form__btn">Login</button>}
          {isPending && (
            <button className="form__btn" disabled>
              Loging in...
            </button>
          )}
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
