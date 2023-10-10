import { baseApiURL } from "../../App";
import { ytTimedText } from "./ytTimedText.js";

export const saveCaptions = (body) => {
  console.log("from saveCaptions body:", body);
  fetch(`${baseApiURL}/home/youtubeCaptionsText`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(async (res) => {
      const data = await res.json();
      console.log("from saveCaptions data:", data);
    })
    .catch(console.error);
};

const extractUtf8Values = (obj, result = []) => {
  if (typeof obj !== "object" || obj === null) return;

  for (const key in obj) {
    if (key === "utf8") {
      result.push(obj[key]);
    } else if (typeof obj[key] === "object") {
      extractUtf8Values(obj[key], result);
    }
  }
  return result;
};

const utf8Values = extractUtf8Values(ytTimedText).join(" ");

export const captions = {
  videoId: "o4m8kCohbzo",
  captionsText: utf8Values,
};

const chatQ =
  "can you give me a minimum of 1 and a maximum of 2 questions for each caption text in this object that a user should be able to answer after watching the corresponding videos. The questions should be simple enough to be answered by 1 to 3 words, contain enough information so the user knows which video the question pertains to, and not rely on context from it's sibling question. The object of captions text, and the format I would like you to structure your response are: ";
