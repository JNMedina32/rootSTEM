import { baseApiURL } from "../../App";

export default function fetchGetFromDB(ACTIONS, dispatch, route, setData) {
  dispatch({ type: ACTIONS.FETCH_START });
  fetch(baseApiURL + route, {
    credentials: "include",
    })
    .then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        console.log("from fetchGetFromDB:", data);
        setData(data);
        dispatch({ type: ACTIONS.FETCH_SUCCESS });
      } else {
        const error = await res.json();
        dispatch({ type: ACTIONS.FETCH_ERROR, payload: error });
      }
    })
    .catch(console.error);
}