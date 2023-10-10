import { baseApiURL } from "../../App";

export const saveQA = (body) => {
  console.log("from saveQA body:", body);
  fetch(`${baseApiURL}/home/QuestionsAnswers`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(async (res) => {
      const data = await res.json();
      console.log("from saveQA data:", data);
    })
    .catch(console.error);
};

export const questionsAnswers = [
  {
    videoId: "H-tjUM_tSng",
    questions_answers: [
      {
        question: "If a character's Unicode value falls outside the range of 97 to 122, is it considered part of the alphabet?",
        answer: "No",
      },
    ],
  },
  {
    videoId: "_bufsCtCgzk",
    questions_answers: [
      {
        question: "What service is being used for authentication features like magic links and two-factor authentication?",
        answer: "Propel auth",
      },
      {
        question: "Why is focusing on authentication not a priority when trying to validate an app quickly?",
        answer: "To build as fast as possible",
      },
    ],
  },
  {
    videoId: "o4m8kCohbzo",
    questions_answers: [
      {
        question: "What is the charge of an antimatter electron, also known as a positron?",
        answer: "Positive",
      },
      {
        question: "What happens when a matter particle collides with its antimatter counterpart?",
        answer: "They annihilate each other",
      },
    ],
  },
];

const questionsAnswersFormat = [
  {
    videoId: "videoId1",
    questions_answers: [
      {
        question: "question1",
        answer: "answer1",
      },
      {
        question: "question2",
        answer: "answer2",
      },
    ],
  },
  {
    videoId: "videoId2",
    questions_answers: [
      {
        question: "question1",
        answer: "answer1",
      },
      {
        question: "question2",
        answer: "answer2",
      },
    ],
  },
  {
    videoId: "videoId3",
    questions_answers: [
      {
        question: "question1",
        answer: "answer1",
      },
      {
        question: "question2",
        answer: "answer2",
      },
    ],
  },
];
