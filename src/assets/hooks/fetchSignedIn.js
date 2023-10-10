import { baseApiURL } from "../../App";

export default function fetchSignedIn(ACTIONS, dispatch, route){
  dispatch({ type: ACTIONS.FETCH_START });
  fetch(baseApiURL + route, {
    credentials: "include",
  })
    .then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        console.log("from fetchSignedIn", data)
 
        dispatch({ type: ACTIONS.FETCH_LOGIN_SUCCESS, payload: data });
      } else {
        const error = await res.json();
        dispatch({ type: ACTIONS.FETCH_ERROR, payload: error });
      }
    })
    .catch(console.error);
};
