import { useState, useContext } from "react";
import { fetchPostHook } from "../assets/hooks/fetchPostHook";
import { Form, Button, InputGroup } from "react-bootstrap";
import { UserContext } from "../App";
import "../assets/styles/Modal.css";

export default function ShowQuestions({
  eaQuestion,
  index,
  setAnsweredQuestions,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const { user, dispatch, ACTIONS } = useContext(UserContext);
  const { question, answer, question_id, video_id } = eaQuestion;
  const [showAnswer, setShowAnswer] = useState(false);

  const handleChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const handleQuestion = (e) => {
    const questionAnswered = [];
    e.preventDefault();
    setShowAnswer(true);
    if (userAnswer === answer) {
      const answeredCorrectly = true;
      questionAnswered.push({
        question_id,
        video_id,
        answeredCorrectly,
        userAnswer,
      });
      setAnsweredQuestions((prev) => [...prev, questionAnswered]);
      fetchPostHook(
        ACTIONS,
        dispatch,
        "/userAccount/answered-questions",
        questionAnswered
      );
    } else {
      const answeredCorrectly = false;
      questionAnswered.push({
        question_id,
        video_id,
        answeredCorrectly,
        userAnswer,
      });
      setAnsweredQuestions((prev) => [...prev, questionAnswered]);
      fetchPostHook(
        ACTIONS,
        dispatch,
        "/userAccount/answered-questions",
        questionAnswered
      );
    }
  };

  return (
    <Form>
      <Form.Label>{question}</Form.Label>
      <InputGroup className="mb-2 eaQuestions">
        <Form.Control type="text" onChange={handleChange} />
        <Button variant="primary" onClick={handleQuestion}>
          Submit
        </Button>
      </InputGroup>
      {showAnswer && (
        <Form.Label>
          {answer === userAnswer ? (
            <p className="correct">Correct! {answer}</p>
          ) : (
            <p className="incorrect">Incorrect! {answer}</p>
          )}
        </Form.Label>
      )}
    </Form>
  );
}
