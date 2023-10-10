import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App.js";
import validEmailFormat from "../assets/hooks/validEmailFormat.js";
import {
  fetchPostHook,
  handleFormChange,
} from "../assets/hooks/fetchPostHook.js";
import "../assets/styles/Login.css";
import { baseApiURL } from "../App.js";

export default function CreateUser() {
  const { user, dispatch, ACTIONS } = useContext(UserContext);
  const { isLoggedIn, isLoading, isError, error } = user;
  // console.log(user);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    dob: "",
  });

  const handleChange = (e) => handleFormChange(e, setFormData);

  const handleOAuth = () =>
    window.open(`${baseApiURL}${"/auth/google"}`, "_self");

  const isValidEmail = validEmailFormat(formData.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail) {
      isError = true;
      error = "Invalid Email Format";
    } else {
      fetchPostHook(ACTIONS, dispatch, "/create_user", formData);
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <Navigate to="/" />
      ) : (
        <div className="container signIn" style={{maxWidth: '600px'}}>
          <form
            className="row justify-content-center mt-5"
            onSubmit={handleSubmit}
          >
            <h3 className="mb-3">Sign Up</h3>
            {isError && (
              <div className="error-message">
                <p>Error: {error}</p>
              </div>
            )}
            <div className="row mb-3">
              <label htmlFor="firstName" className="col col-form-label">
                First Name:
              </label>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className="col col-form-label" htmlFor="last_name">
                Last Name:
              </label>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="username" className="col col-form-label">
                Username:
              </label>
              <div className="col">
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
              <label htmlFor="email" className="col col-form-label">
                Email:
              </label>
              <div className="col">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="password" className="col col-form-label">
                Password:
              </label>
              <div className="col">
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
            <div className="row mb-3">
              <label htmlFor="dob" className="col col-form-label">
                Date of Birth:
              </label>
              <div className="col">
                <input
                  type="date"
                  className="form-control"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="tos"
                required
              />
              <label className="form-check-label" htmlFor="tos">
                <p name="tos">
                  By continuing, you agree to <u>rootS</u>TEM Terms of Service
                  and confirm that you have read <u>rootS</u>TEM Privacy Policy.
                </p>
              </label>
            </div>
            <button
              className="btn col-4 mb-5"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Create Account"}
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
              <svg
                width="1em"
                data-e2e=""
                height="1em"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M43 24.4313C43 23.084 42.8767 21.7885 42.6475 20.5449H24.3877V27.8945H34.8219C34.3724 30.2695 33.0065 32.2818 30.9532 33.6291V38.3964H37.2189C40.885 35.0886 43 30.2177 43 24.4313Z"
                  fill="#4285F4"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M24.3872 43.001C29.6219 43.001 34.0107 41.2996 37.2184 38.3978L30.9527 33.6305C29.2165 34.7705 26.9958 35.4441 24.3872 35.4441C19.3375 35.4441 15.0633 32.1018 13.5388 27.6108H7.06152V32.5337C10.2517 38.7433 16.8082 43.001 24.3872 43.001Z"
                  fill="#34A853"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.5395 27.6094C13.1516 26.4695 12.9313 25.2517 12.9313 23.9994C12.9313 22.7472 13.1516 21.5295 13.5395 20.3894V15.4668H7.06217C5.74911 18.0318 5 20.9336 5 23.9994C5 27.0654 5.74911 29.9673 7.06217 32.5323L13.5395 27.6094Z"
                  fill="#FBBC04"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M24.3872 12.5568C27.2336 12.5568 29.7894 13.5155 31.7987 15.3982L37.3595 9.94866C34.0018 6.88281 29.6131 5 24.3872 5C16.8082 5 10.2517 9.25777 7.06152 15.4674L13.5388 20.39C15.0633 15.8991 19.3375 12.5568 24.3872 12.5568Z"
                  fill="#EA4335"
                ></path>
              </svg>
              Sign in with Google
            </button>
          </div>
        </div>
      )}
    </>
  );
}
