import React, { useState } from "react";
import Registration from "../Registration/Registration";
import styles from "./Quiz.module.css";

interface Question {
  question: string;
  options: string[];
}

interface Answer {
  question: string;
  answer: string;
}

const questions: Question[] = [
  {
    question: "How often do you use a busy status?",
    options: ["Rarely", "Sometimes", "Often"],
  },
  {
    question: "Which device do you use most for work?",
    options: ["Laptop", "Desktop", "Tablet"],
  },
  {
    question: "What is your main reason for using a busy status?",
    options: ["Privacy", "Productivity", "Meetings"],
  },
  {
    question: "How do you prefer to be notified about status changes?",
    options: ["Email", "Push Notification", "SMS"],
  },
  {
    question: "Would you recommend this feature to a colleague?",
    options: ["Yes", "No", "Maybe"],
  },
];

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnswerClick = (answer: string) => {
    setAnswers((prev) => [
      ...prev,
      { question: questions[currentQuestion].question, answer },
    ]);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsCompleted(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Life Busy Status</h1>
        {!isCompleted ? (
          <div className={styles.quizBox}>
            <h2 className={styles.question}>
              {questions[currentQuestion].question}
            </h2>
            <div className={styles.options}>
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={styles.optionButton}
                  onClick={() => handleAnswerClick(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <Registration answers={answers} />
        )}
      </div>
      <div className={styles.imageContainer}>
        <img className={styles.quizImage} src="/images/image.jpg" alt="Quiz" />
      </div>
    </div>
  );
};

export default Quiz;
