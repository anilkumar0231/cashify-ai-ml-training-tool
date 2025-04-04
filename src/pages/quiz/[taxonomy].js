import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const mockQuizzes = {
  front: [
    {
      question: 'What is React?',
      options: ['Library', 'Framework', 'Language', 'Tool'],
      answer: 'Library',
    },
    {
      question: 'What does JSX stand for?',
      options: ['JavaScript XML', 'Java Syntax XML', 'JSX Style', 'None'],
      answer: 'JavaScript XML',
    },
    // Add more mock questions up to 10...
  ],
  back: [/* 10 questions */],
  side: [/* 10 questions */],
};

export default function QuizPage() {
  const router = useRouter();
  const { taxonomy } = router.query;

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (!taxonomy) return;
    setQuestions(mockQuizzes[taxonomy] || []);
  }, [taxonomy]);

  const handleOptionClick = (option) => {
    setSelected(option);
  };

  const handleNext = () => {
    const currentQ = questions[current];
    const isCorrect = selected === currentQ.answer;
    setScore((prev) => (isCorrect ? prev + 1 : prev));
    setAnswers((prev) => [
      ...prev,
      { question: currentQ.question, selected, correct: currentQ.answer },
    ]);
    setSelected(null);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRetry = () => {
    // Later, admin approval logic will come here
    router.push(`/training/${taxonomy}`);
  };

  if (!taxonomy || questions.length === 0) return <div>Loading...</div>;

  if (showResult) {
    return (
      <div style={styles.container}>
        <h2 style={styles.title}>Your Score: {score}/{questions.length}</h2>
        <h3 style={styles.subtitle}>Review Answers:</h3>
        <ul style={styles.reviewList}>
          {answers.map((ans, idx) => (
            <li key={idx}>
              <strong>Q{idx + 1}:</strong> {ans.question} <br />
              ✅ Correct: <strong>{ans.correct}</strong> | ❌ Your Answer: <span style={{ color: ans.selected === ans.correct ? 'green' : 'red' }}>{ans.selected}</span>
            </li>
          ))}
        </ul>
        <button style={styles.button} onClick={handleRetry}>
          Retry Training
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Question {current + 1} of {questions.length}</h2>
      <h3 style={styles.question}>{questions[current].question}</h3>
      <div>
        {questions[current].options.map((opt) => (
          <button
            key={opt}
            style={{
              ...styles.option,
              backgroundColor: selected === opt ? '#008080' : '#eee',
              color: selected === opt ? 'white' : 'black',
            }}
            onClick={() => handleOptionClick(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
      <button
        style={styles.nextButton}
        onClick={handleNext}
        disabled={selected === null}
      >
        {current + 1 === questions.length ? 'Finish Quiz' : 'Next'}
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '700px',
    margin: 'auto',
    padding: '40px',
  },
  title: {
    fontSize: '1.8rem',
    color: '#008080',
    marginBottom: '20px',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '1.2rem',
    marginTop: '20px',
  },
  question: {
    marginBottom: '20px',
    fontSize: '1.2rem',
  },
  option: {
    display: 'block',
    padding: '10px 16px',
    marginBottom: '10px',
    width: '100%',
    borderRadius: '8px',
    border: '1px solid #ccc',
    cursor: 'pointer',
    textAlign: 'left',
  },
  nextButton: {
    marginTop: '20px',
    padding: '12px 24px',
    backgroundColor: '#008080',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '100%',
  },
  reviewList: {
    paddingLeft: '20px',
    marginTop: '20px',
  },
  button: {
    marginTop: '30px',
    padding: '10px 24px',
    backgroundColor: '#008080',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};
