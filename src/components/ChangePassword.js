import { useContext, useState } from "react";
import { UserContext } from "../App";
import {
  handleFormChange,
  fetchPostHook,
} from "../assets/hooks/fetchPostHook.js";
import "../assets/styles/UserAccount.css";

export default function ChangePassword() {
  const { user, dispatch, ACTIONS } = useContext(UserContext);
  const { isLoading, isError, error, username, successfulPassword } = user;
  const [password, setPassword] = useState({
    username: username,
    oldPassword: "",
    newPassword: "",
  });

  const handlePasswordInput = (e) => handleFormChange(e, setPassword);

  const handlePasswordChange = (e) => {
    e.preventDefault();
    fetchPostHook(ACTIONS, dispatch, "/update_password", password);
  };

  return (
    <div className="m-5">
      <form className="row" onSubmit={handlePasswordChange}>
        {isError && (
          <div className="row">
            <p
              className="errorMessageText"
              style={{ color: "red", backgroundColor: "black" }}
            >
              Error: {error}
            </p>
          </div>
        )}
        {successfulPassword && (
          <div className="row">
            <p style={{ color: "green", backgroundColor: "black" }}>
              Password Changed
            </p>
          </div>
        )}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button btn collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#changePassword"
              aria-expanded="false"
              aria-controls="changePassword"
            >
              Change Password
            </button>
          </h2>
          <div id="changePassword" className="accordion-collapse collapse">
            <div className="accordion-body">
              <div className="col-auto">
                <h5>Please Re-Enter your current password:</h5>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Old Password"
                  aria-label="Old Password"
                  aria-describedby="button-addon2"
                  name="oldPassword"
                  value={password.oldPassword}
                  onChange={handlePasswordInput}
                />
                <h5>New password:</h5>
                <div className="input-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="New Password"
                    aria-label="New Password"
                    name="newPassword"
                    value={password.newPassword}
                    onChange={handlePasswordInput}
                  />
                  <div className="col-auto">
                    <button
                      className="btn"
                      type="submit"
                      style={{ backgroundColor: "#1D292" }}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        "Change"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
