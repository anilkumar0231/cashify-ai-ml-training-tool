import { useRouter } from 'next/router';
import ReactPlayer from 'react-player';
import { useState, useEffect } from 'react';
import { saveQuizResult } from '@/firebase/db';

const videoLinks = {
  front: 'https://www.w3schools.com/html/mov_bbb.mp4',
  back: 'https://www.w3schools.com/html/movie.mp4',
  side: 'https://www.w3schools.com/html/mov_bbb.mp4',
};

const handleSubmit = async () => {
    const correctAnswers = questions.reduce((acc, q, index) => {
      return acc + (q.correctAnswer === userAnswers[index] ? 1 : 0);
    }, 0);
    const score = (correctAnswers / questions.length) * 100;
  
    if (user) {
      await saveQuizResult(user.uid, taxonomyId, score, questions, correctAnswers);
    }
  
    setShowResults(true);
    setScore(score);
  };
  
export default function TaxonomyTrainingPage() {
  const router = useRouter();
  const { taxonomy } = router.query;
  const [videoCompleted, setVideoCompleted] = useState(false);

  useEffect(() => {
    if (!taxonomy) return;
    if (!videoLinks[taxonomy]) router.push('/training');
  }, [taxonomy]);

  const handleVideoEnd = () => {
    setVideoCompleted(true);
  };

  const startQuiz = () => {
    router.push(`/quiz/${taxonomy}`);
  };

  if (!taxonomy || !videoLinks[taxonomy]) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Training: {taxonomy.toUpperCase()}</h1>

      <ReactPlayer
        url={videoLinks[taxonomy]}
        controls
        width="100%"
        height="480px"
        onEnded={handleVideoEnd}
      />

      {!videoCompleted ? (
        <p style={styles.notice}>Watch the full video to unlock the quiz.</p>
      ) : (
        <button style={styles.button} onClick={startQuiz}>
          Start Quiz
        </button>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '40px',
    maxWidth: '800px',
    margin: 'auto',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#008080',
    textAlign: 'center',
  },
  notice: {
    marginTop: '20px',
    fontStyle: 'italic',
    color: 'gray',
    textAlign: 'center',
  },
  button: {
    marginTop: '30px',
    backgroundColor: '#008080',
    color: '#fff',
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};
