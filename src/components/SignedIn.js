import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext, baseApiURL } from "../App.js";
import "../assets/styles/Home.css";

export default function SignedIn() {
  const { user, dispatch, ACTIONS } = useContext(UserContext);
  //console.log(user);
  const { username } = user;

  const handleClick = () => {
    fetch(`${baseApiURL}/logout`)
      .then((res) => res.json())
      .then(() => dispatch({ type: ACTIONS.FETCH_LOGOUT_SUCCESS }))
      .catch((error) => {
        dispatch({ type: ACTIONS.FETCH_ERROR, payload: error.message });
      });
  };

  return (
    <div className="container text-center">
      <h1 className="mb-5">Hello {username}</h1>
      <div className="row mb-5">
        <Link to="/UserAccount">
          <button className="btn btn-secondary" data-bs-dismiss="offcanvas">
            Account
          </button>
        </Link>
      </div>
      <div className="row align-items-end">
        <div className="col">
          <button
            className="btn btn-danger"
            type="submit"
            data-bs-dismiss="offcanvas"
            onClick={handleClick}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
