import "../assets/styles/Login.css";
import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../App.js";
import { baseApiURL } from "../App.js";
import {
  fetchPostHook,
  handleFormChange,
} from "../assets/hooks/fetchPostHook.js";
import googleSVG from "../assets/images/googleSVG.svg";


export default function SignIn() {
  const { user, dispatch, ACTIONS } = useContext(UserContext);
  const { isLoggedIn, isError, isLoading, error } = user;

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => handleFormChange(e, setFormData);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPostHook(ACTIONS, dispatch, '/login', formData);
  };

  const handleOAuth = () => {
    window.open(`${baseApiURL}${"/auth/google"}`, "_self");
  }
    

  return (
    <>
      {isLoggedIn ? (
        <Navigate to="/" />
      ) : (
        <div className="container signIn" style={{maxWidth: '600px'}} >
          <form
            className="row justify-content-center mt-5"
            onSubmit={handleSubmit}
          >
            <h3 className="mb-3">Sign In</h3>
            {isError && (
              <div className="error-message">
                {console.log(user)}
                <p style={{ color: "red", backgroundColor: "black" }}>
                  Error: {error}
                </p>
              </div>
            )}
            <div className="row mb-3">
              <label htmlFor="username" className="col col-form-label">
                Username
              </label>
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="password" className="col col-form-label">
                Password
              </label>
              <div className="col-auto">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button
              className="btn col-5 mb-4"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </form>

          <div
            className="btn-group mb-3 mt-3"
            role="group"
            aria-label="Default button group"
          >
            <button
              className="btn"
              style={{ backgroundColor: "white", color: "black" }}
              onClick={handleOAuth}
            >
              <img src={googleSVG} alt="googleLogoIcon" width="20" height="20" />
              Sign in with Google
            </button>
          </div>
          <p>
            By continuing, you agree to <u>rootS</u>TEM Terms of Service and
            confirm that you have read <u>rootS</u>TEM Privacy Policy.
          </p>

          <div className="row justify-content-center">
            <Link to="/CreateUser">
              <button className="btn col-4">New User</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
