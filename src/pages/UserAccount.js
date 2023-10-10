import { useContext, useEffect } from "react";
import { UserContext } from "../App.js";
import { Navigate } from "react-router-dom";
import "../assets/styles/UserAccount.css";
import ChangeUsername from "../components/ChangeUsername.js";
import ChangePassword from "../components/ChangePassword.js";
import UserAppSettings from "../components/UserAppSettings.js";
import { captions, saveCaptions } from "../assets/utilities/captions.js";
import { questionsAnswers, saveQA } from "../assets/utilities/questionsAnswers.js";

export default function UserAccount() {
  const { user, ACTIONS, dispatch } = useContext(UserContext);
  const { isLoggedIn, username } = user;

  const handleCaptions = () => {
    saveCaptions(captions);
  };

  const handleQuestions = () => {
    saveQA({ questionsAnswers });
  };

  return (
    <>
      {!isLoggedIn ? (
        <Navigate to={"/Login"} />
      ) : (
        <div className="container mb-5 acctSettingsDiv">
          <h3 className="m-5">Account for {username}:</h3>
          <ChangeUsername />
          <ChangePassword />
          <h3 className="mb-5">App Settings:</h3>
          <UserAppSettings />
          {/* <button className="btn" onClick={handleCaptions}>
            saveCaptions
          </button>
          <button className="btn" onClick={handleQuestions}>
            saveQA
          </button> */}
        </div>
      )}
    </>
  );
}
