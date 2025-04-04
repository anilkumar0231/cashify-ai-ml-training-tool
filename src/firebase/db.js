import { db } from './firebase';
import { doc, setDoc, serverTimestamp, collection, query, where, getDocs } from 'firebase/firestore';

export const saveQuizResult = async (userId, taxonomyId, score, questions, correctAnswers) => {
  try {
    const resultRef = doc(db, 'userProgress', `${userId}_${taxonomyId}`);
    await setDoc(resultRef, {
      userId,
      taxonomyId,
      score,
      correctAnswers,
      totalQuestions: questions.length,
      completedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error saving quiz result:', error);
  }
};
