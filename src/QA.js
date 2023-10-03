import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './QA.css'

function Qa() {
  const { certificateID } = useParams();

  const [certifiedpeople, setCertifiedPeople] = useState([]);
  const [qaList, setQAList] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

  // Maintain separate states for answers
  const [answerInputs, setAnswerInputs] = useState([]);

  useEffect(() => {
    // Initialize answerInputs with empty strings for each question
    const initialAnswerInputs = qaList.map((qaItem) => "");
    setAnswerInputs(initialAnswerInputs);
  }, [qaList]);

  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      axios
        .post("http://localhost:8000/add-question", {
          question: newQuestion,
          certificateID: certificateID,
          empID: sessionStorage.getItem('empid'), // Replace with the actual employee ID
        })
        .then((response) => {
          console.log(response.data);
          const newQuestionItem = {
            questionID: response.data.maxid,
            question: newQuestion,
            answers: [],
          };
          setQAList([...qaList, newQuestionItem]);
          setNewQuestion("");
        })
        .catch((error) => {
          console.error("Error adding question:", error);
        });
    }
  };

  const handleAddAnswer = (index) => {
    const questionID = qaList[index].QuestionID;
    const answer = answerInputs[index];

    if (answer.trim()) {
      axios
        .post("http://localhost:8000/add-answer", {
          questionID: questionID,
          answer: answer,
          answeredby: sessionStorage.getItem('empid'), // Replace with the actual employee ID
        })
        .then((response) => {
          console.log(response.data);
          const updatedQAList = [...qaList];
          updatedQAList[index].answers.push({
            answerText: answer,
            answeredBy: sessionStorage.getItem('empid'), // Replace with the actual employee ID
            // createdDate: new Date().toISOString(), // Use the current date as created date
          });
          setQAList(updatedQAList);

          // Clear the input for this question
          const updatedAnswerInputs = [...answerInputs];
          updatedAnswerInputs[index] = "";
          setAnswerInputs(updatedAnswerInputs);

          setSelectedQuestionIndex(null);
        })
        .catch((error) => {
          console.error("Error adding answer:", error);
        });
    }
  };

  useEffect(() => {
    // Retrieve certified people
    axios
      .post("http://localhost:8000/getcertifiedpeople", {
        certificateID: certificateID,
      })
      .then((response) => {
        setCertifiedPeople(response.data.certifiedpeople);
      })
      .catch((error) => {
        console.error("Error fetching certified employee data:", error);
      });

    // Retrieve QA data
    axios
      .get(`http://localhost:8000/get-qa-data/${certificateID}`)
      .then((response) => {
        console.log(response.data);
        setQAList(response.data);
      })
      .catch((error) => {
        console.error("Error retrieving QA data:", error);
      });
  }, [certificateID,newQuestion]);

  return (
    <div className="qa-container">
      <div className="certifiedpeople">
        <h2>Certified People</h2>
        <ul>
          {certifiedpeople.map((certifiedemployee) => (
            <li key={certifiedemployee.certificateid}>
              <strong>EmployeeID: {certifiedemployee.employeeid}</strong>{" "}
              {certifiedemployee.employeename} - {certifiedemployee.email}
            </li>
          ))}
        </ul>
      </div>
      <div className="qa-section">
        <h1>Q&A Page</h1>
        <div className="qa-input">
          <input
            type="text"
            placeholder="Ask a question"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <button onClick={handleAddQuestion}>Ask</button>
        </div>
        <div className="qa-list">
          {qaList.map((qaItem, index) => (
            <div key={qaItem.QuestionID} className="qa-item">
              <div className="qa-question">
                <span>Question:{qaItem.Question}</span>
                <span className="created-date">
                  Created on: {qaItem.CreatedOn}
                </span>
              </div>
              <ul className="qa-answers">
                {qaItem.answers.map((answer, answerIndex) => (
                  <li key={answerIndex}>
                    <span>Answer: {answer.Answer}</span>
                    <span className="answered-by">
                      Answered by: {answer.EmpName}
                    </span>
                    <span className="created-date">
                      Answered on: {answer.AnsweredOn}
                    </span>
                    <span className="votes">
                      Votes: {answer.Votes}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="qa-answer-input">
                <input
                  type="text"
                  placeholder="Write an answer"
                  value={answerInputs[index]}
                  onChange={(e) => {
                    const updatedAnswerInputs = [...answerInputs];
                    updatedAnswerInputs[index] = e.target.value;
                    setAnswerInputs(updatedAnswerInputs);
                  }}
                />
                <button
                  onClick={() => {
                    setSelectedQuestionIndex(index);
                    handleAddAnswer(index);
                  }}
                >
                  Answer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Qa;
