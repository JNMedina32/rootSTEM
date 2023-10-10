import { Link } from "react-router-dom";
import "../assets/styles/Navbar.css";
import { useContext } from "react";
import { UserContext } from "../App";
import SignedIn from "./SignedIn.js";

export default function NavbarMenu() {
  const { user } = useContext(UserContext);
  const { isLoggedIn, username, img } = user;

  return (
    <div className="">
      <button
        className="btn"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample"
        aria-controls="offcanvasExample"
      > {isLoggedIn ? (
        <img src={img} className="rounded mx-auto d-block" width="50" height="50" />
      ) : (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="currentColor"
        className="bi bi-list"
        viewBox="0 0 16 16"
      >
        <path
          fill="evenodd"
          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
        />
      </svg>
      )}
      </button>

      <div
        className="offcanvas offcanvas-end nbm"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
        
      >
        <div className="offcanvas-header">
          <Link style={{ color: "#f2dc85" }} to="/">
            <h5
              className="offcanvas-title"
              id="offcanvasExampleLabel"
              data-bs-dismiss="offcanvas"
            >
              <u>rootS</u>TEM
            </h5>
          </Link>
          {isLoggedIn && <img src={img} className="rounded mx-auto d-block" width="70" height="70" />}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {isLoggedIn ? (
            <SignedIn />
          ) : (
            <div>
              <h6 className="mb-5">Hello {username}</h6>
              <Link to="/Login">
                <button
                  className="btn btn-secondary"
                  type="button"
                  data-bs-dismiss="offcanvas"
                >
                  Log in
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
