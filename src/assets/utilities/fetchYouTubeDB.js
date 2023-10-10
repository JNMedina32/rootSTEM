import { baseApiURL } from "../../App.js";


export default function fetchYouTubeDB(route) {
  fetch(`${baseApiURL}${route}`, {
    credentials: "include",
    })
    .then(async (res) => {
      if (res.ok) {
        console.log("from fetchYouTubeDB", res);
        const data = await res.json();
        console.log(data);
      } else {
        const error = await res.json();
        console.log(error);
      }
    })
    .catch(console.error);
}