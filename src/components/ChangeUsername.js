import { useContext, useState } from "react";
import { UserContext } from "../App";
import {
  handleFormChange,
  fetchPostHook,
} from "../assets/hooks/fetchPostHook.js";
import "../assets/styles/UserAccount.css";

export default function ChangeUsername() {
  const { user, dispatch, ACTIONS } = useContext(UserContext);
  const { isLoading, isError, error, username, successfulUsername } = user;
  const [newUsername, setNewUsername] = useState({
    newUsername: "",
    username: username,
  });

  const handleUsernameInput = (e) => handleFormChange(e, setNewUsername);

  const handleUsernameChange = (e) => {
    e.preventDefault();
    console.log(newUsername);
    fetchPostHook(ACTIONS, dispatch, "/update_username", newUsername);
  };

  return (
    <div className="m-5">
      <form className="row" onSubmit={handleUsernameChange}>
        {isError && (
          <div className="row">
            <p style={{ color: "red", backgroundColor: "black" }}>
              Error: {error}
            </p>
          </div>
        )}
        {successfulUsername && (
          <div className="row">
            <p style={{ color: "green", backgroundColor: "black" }}>
              Username Changed
            </p>
          </div>
        )}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button btn collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#changeUsername"
              aria-expanded="false"
              aria-controls="changeUsername"
            >
              Change Username
            </button>
          </h2>
          <div id="changeUsername" className="accordion-collapse collapse">
            <div className="accordion-body">
              <div className="col-auto">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Change Username"
                    aria-label="Change Username"
                    name="newUsername"
                    value={newUsername.newUsername}
                    onChange={handleUsernameInput}
                    required
                  />
                  <div className="col-auto">
                    <button
                      className="btn input-group-text"
                      type="submit"
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
