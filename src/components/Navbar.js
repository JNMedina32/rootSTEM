import { Link } from "react-router-dom";
import Logo from "../assets/images/rootSTEM.jpg";
import "../assets/styles/Navbar.css";
import NavbarMenu from "./NavbarMenu.js";
import { useContext, useState } from "react";
import { UserContext } from "../App.js";
import fetchGetFromDB from "../assets/hooks/fetchGetFromDB";

export default function Navbar({ setSearchedVideos }) {
  const [searchTerm, setSearchTerm] = useState("");
  const { dispatch, ACTIONS } = useContext(UserContext);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchGetFromDB(
      ACTIONS,
      dispatch,
      `/home?searchTerm=${searchTerm}`,
      setSearchedVideos
    );
  };

  return (
    <nav className="navbar sticky-top mb-5">
      <div className="container-lg">
        <Link
          className="navbar-brand"
          style={{ color: "var(--second-color)" }}
          to="/"
        >
          <img
            src={Logo}
            alt="rootSTEM Logo"
            width="30"
            height="30"
            className="d-inline-block align-text-top"
          />
          <u>rootS</u>TEM
        </Link>
        <div>
          <form
            className="d-flex input-group mb-2"
            role="search"
            onSubmit={handleSearch}
          >
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn" type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
          </form>
        </div>
        <NavbarMenu />
      </div>
    </nav>
  );
}
