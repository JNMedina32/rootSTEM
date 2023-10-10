import { baseApiURL } from "../../App";

export const fetchPostHook = (ACTIONS, dispatch, route, body) => {
  console.log("from fetchPostHook body:", body);
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
      console.log("from fetchPostHook res:", res);
      const data =  await res.json();
      console.log("from fetchPostHook data:", data);
      if (res.ok) {
        if (data) {
          dispatch({ type: ACTIONS.FETCH_LOGIN_SUCCESS, payload: data });
        } else {
          dispatch({ type: ACTIONS.FETCH_SUCCESS });
        }
      } else {
        console.log(data);
        dispatch({ type: ACTIONS.FETCH_ERROR, payload: data });
      }
    })
    .catch(console.error);
};


export const handleFormChange = (e, setData) => {
  const { name, value } = e.target;
  setData((prevFormData) => ({
    ...prevFormData,
    [name]: value,
  }));
};


