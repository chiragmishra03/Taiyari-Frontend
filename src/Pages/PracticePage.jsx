import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./SCSS/PracticePage.scss";
import Loader from "../SubComponents/Components/Loader";

const fetchQuestions = async (topic, difficulty) => {
  try {
    const response = await fetch(
      "https://taiyari-backend.onrender.com/api/questions/create-ques",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ language: topic, level: difficulty }),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.questions.map((question, index) => ({
      question,
      id: index + 1,
    }));
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
};
function PracticePage() {
  const { languageName, level } = useParams();
  const nav = useNavigate();
  const location = useLocation();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userAnswer, setUserAnswer] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerExpired, setTimerExpired] = useState(false);
  const [quizEnded, setQuizEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [micAccess, setMicAccess] = useState(true);
  const [feedback, setFeedback] = useState(null);
  const recognitionRef = useRef(null);
  const intervalRef = useRef(null);

  const GetFeedback = async () => {
    const response = await fetch(
      "https://taiyari-backend.onrender.com/api/questions/get-feedback",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answerArray: answers,
          questionArray: questions,
        }),
      }
    );
    const data = await response.json();
    if (data.feedback) {
      setFeedback(data.feedback);
    } else {
      setFeedback("Currently Not available or try correcting your answer");
    }
  };

  useEffect(() => {
    async function getQuestions() {
      setLoading(true);
      const data = await fetchQuestions(languageName, level);
      setQuestions(data);
      setLoading(false);
    }
    getQuestions();
  }, [languageName, level]);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.log("Web Speech API is not supported by this browser.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const speechRecognition = new SpeechRecognition();
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
    speechRecognition.lang = "en-US";

    let finalTranscript = "";

    speechRecognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setUserAnswer(finalTranscript + interimTranscript);
    };
    speechRecognition.onerror = (event) => {
      console.error("Speech recognition error: ", event.error);
    };

    speechRecognition.onend = () => {
      if (isRecording) {
        speechRecognition.start();
      }
    };

    recognitionRef.current = speechRecognition;
  }, [isRecording]);

  const startRecording = () => {
    if (recognitionRef.current && micAccess) {
      setIsRecording(true);
      recognitionRef.current.start();
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  useEffect(() => {
    if (isRecording) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 1) {
            setTimerExpired(true);
            stopRecording();
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
      setTimeLeft(30);
      setTimerExpired(false);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRecording]);

  const submitAnswer = () => {
    if (!micAccess) {
      alert("Microphone access is required to submit an answer.");
      return;
    }
    setAnswers((prevAnswers) => {
      const updatedAnswers = [
        ...prevAnswers,
        { questionId: questions[currentQuestionIndex]?.id, answer: userAnswer },
      ];
      console.log(updatedAnswers);
      return updatedAnswers;
    });
    setLoading(true);
    setUserAnswer("");
    setTimeout(() => {
      setUserAnswer("");
      setLoading(false);
      handleNextQuestion();
    }, 1500);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(30);
      setTimerExpired(false);
    } else {
      setQuizEnded(true);
      stopRecording();
    }
  };

  const handleTimerExpired = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setUserAnswer("");
      handleNextQuestion();
    }, 1500);
  };

  useEffect(() => {
    if (location.pathname !== "/practice") {
      stopRecording();
    }
  }, [location]);

  if (quizEnded) {
    return (
      <div className="feedback-container">
        <h2>Summary!</h2>
        <div>
          <h3>Answers Summary:</h3>
          <ul>
            {answers.map((ans, index) => (
              <li key={index}>
                Answer {ans.questionId} - {ans.answer}
              </li>
            ))}
          </ul>
        </div>
        {feedback == null ? (
          <button onClick={GetFeedback}>View Feedback</button>
        ) : (
          <button style={{ background: "green" }} onClick={() => nav("/home")}>
            HOME
          </button>
        )}
        <p>{feedback}</p>
      </div>
    );
  }

  return (
    <div className="practice-container">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="heading-container">
            <h2>
              TOPIC - <b>{languageName}</b>
            </h2>
            <h3>
              Difficulty - <b>{level}</b>
            </h3>
            <div className="timer">
              TIMER: <span>{timeLeft} Seconds</span>
            </div>
          </div>

          {micAccess && (
            <div className="question-box">
              {questions[currentQuestionIndex] ? (
                <h3>{questions[currentQuestionIndex].question}</h3>
              ) : (
                <p>Loading question...</p>
              )}
            </div>
          )}

          <div className="answer-section">
            {isRecording ? (
              <p>Recording... Please speak your answer.</p>
            ) : (
              <button onClick={startRecording} className="record-button">
                Start Recording
              </button>
            )}

            {userAnswer && (
              <div>
                <p>Your Answer: {userAnswer}</p>
                <button onClick={submitAnswer} className="submit-button">
                  Submit Answer
                </button>
              </div>
            )}
          </div>

          {timerExpired && handleTimerExpired()}
        </>
      )}
    </div>
  );
}

export default PracticePage;
