import { useContext, useState, useEffect } from "react";
import { UserContext } from "../App.js";
import ShowQuestions from "./ShowQuestions.js";
import { Modal, Button } from "react-bootstrap";
import "../assets/styles/Modal.css";

export default function QuestionsModal() {
  const { user } = useContext(UserContext);
  const { questions, learner, username } = user;
  const [answeredQuestions, setAnsweredQuestions] = useState([]); // [{question: "question", answer: "answer"}
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [randomQuestions, setRandomQuestions] = useState([]);
  const [questionsAcc, setQuestionsAcc] = useState([]);
  const [count, setCount] = useState(0);

  //------------Determines after how many videos watched to ask questions, and how many questions to ask
  const whenToAskQuestions = () => {
    switch (learner) {
      case "Seedling":
        return [0, 0];
      case "Sprout":
        return [3, 1];
      case "Sapling":
        return [5, 2];
      case "Branching":
        return [10, 5];
      case "Full Bloom":
        return [10, 7];
      default:
        return [0, 0];
    }
  };

  const [whenToAsk, howManyQuestions] = whenToAskQuestions();
  console.log(
    "from useQuestion/whenToAsk:howMany",
    // whenToAsk,
    howManyQuestions
  );
  console.log("from QuestionsModal/questions:", questions);
  const randomQuestionsPicker = (howManyQuestions) => {
    const randomQuestionsPicked = [];
    if (questionsAcc.length >= howManyQuestions) {
      const questionsCopy = [...questionsAcc];
      for (let i = 0; i < howManyQuestions; i++) {
        const randomIndex = Math.floor(Math.random() * questionsCopy.length);
        randomQuestionsPicked.push(questionsCopy[randomIndex]);
        questionsCopy.splice(randomIndex, 1);
      }
    }
    setRandomQuestions(randomQuestionsPicked);
  };

  //-----------Determines which questions to ask based on learner type
  const handleQuestions = () => {
    switch (learner) {
      case "Seedling":
        return;
      case "Sprout":
        return randomQuestionsPicker(1);
      case "Sapling":
        return randomQuestionsPicker(2);
      case "Branching":
        return randomQuestionsPicker(5);
      case "Full Bloom":
        return randomQuestionsPicker(7);
      default:
        return;
    }
  };

  useEffect(() => {
    
    if (whenToAsk === 0) {
      return;
    }
    if (questions) {
      setQuestionsAcc((prev) => [...prev, ...questions], setCount(count + 1));
      console.log("from QuestionsModal/questionsAcc:", questionsAcc);
      console.log("from QuestionsModal/count:", count);
      let counter = count + 1;
      console.log("from QuestionsModal/counter:", counter);
      if (counter === whenToAsk) {
        handleQuestions();
        setShow(true);
        setCount(0);
      } else {
        setShow(false);
      }
    } else {
      setShow(false);
    }
  }, [questions]);

  console.log(
    "from QuestionsModal/randomQuestions.length:",
    randomQuestions.length
  );
  console.log(
    "from QuestionsModal/answeredQuestions.length:",
    answeredQuestions.length
  );

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      setAnsweredQuestions={setAnsweredQuestions}
    >
      <Modal.Header className="questions-modal">
        <Modal.Title>
          <div>
            Question(s) for {learner} {username}
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="questions-modal">
        {randomQuestions.map((eaQuestion, index) => (
          <ShowQuestions
            key={index}
            eaQuestion={eaQuestion}
            index={index}
            setAnsweredQuestions={setAnsweredQuestions}
          />
        ))}
      </Modal.Body>
      <Modal.Footer className="questions-modal">
        {answeredQuestions.length === randomQuestions.length ? (
          <Button variant="secondary" onClick={handleClose}>
            Continue with rootS
          </Button>
        ) : (
          <p>Please answer questions</p>
        )}
      </Modal.Footer>
    </Modal>
  );
}
