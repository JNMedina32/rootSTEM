import { baseApiURL } from "../../App";

export const fetchCaptions = (body) => {
  fetch(`${baseApiURL}/home/captions`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(async (res) => {
      const resText = await res.text();
      if (res.ok) {
        if (resText) {
          const data = await res.json();
          console.log(data);
          return data;
        } else {
          return;
        }
      } else {
        const error = await res.json();
        console.log(error);
        return error;
      }
    })
    .catch(console.error);
} 