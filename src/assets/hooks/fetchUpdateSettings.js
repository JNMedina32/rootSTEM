import { baseApiURL } from "../../App";

export default function fetchUpdateSettings(ACTIONS, dispatch, route, setData, body){
  dispatch({ type: ACTIONS.FETCH_START });
  fetch(`${baseApiURL}${route}`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        setData(data);
        dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: data });
      } else {
        const error = await res.json();
        dispatch({ type: ACTIONS.FETCH_ERROR, payload: error.message });
      }
    })
    .catch(console.error);
};