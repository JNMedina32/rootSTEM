import { createContext, useReducer, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./assets/styles/App.css";
import Navbar from "./components/Navbar.js";
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import CreateUser from "./pages/CreateUser.js";
import UserAccount from "./pages/UserAccount.js";

import { userReducer, ACTIONS } from "./assets/hooks/userReducer.js";
import fetchSignedIn from "./assets/hooks/fetchSignedIn";

export const UserContext = createContext();
export const baseApiURL = "http://localhost:8080";

function App() {
  const [userData, setUserData] = useState(() => ({
    isLoggedIn: false,
    username: "Guest",
  }));

  const [searchedVideos, setSearchedVideos] = useState([]);

  const [user, dispatch] = useReducer(userReducer, userData);
  //console.log("localstorage returned:", userData);
  console.log("userReducer returned:", user);

  useEffect(() => {
    fetchSignedIn(ACTIONS, dispatch, "/account");
  }, []);

  return (
    <UserContext.Provider value={{ user, dispatch, ACTIONS }}>
      <Navbar setSearchedVideos={setSearchedVideos} />
      <Routes>
        <Route path="/" element={<Home searchedVideos={searchedVideos} />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/CreateUser" element={<CreateUser />} />
        <Route path="/UserAccount" element={<UserAccount />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
