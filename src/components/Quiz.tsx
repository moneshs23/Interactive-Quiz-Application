import React, { useReducer, useEffect } from 'react';
import { QuizState, QuizAction, QuizQuestion } from '../types';
import Question from './Question';
import ProgressBar from './ProgressBar';
import Results from './Results';
import { ChevronRight } from 'lucide-react';

interface QuizProps {
  questions: QuizQuestion[];
}

const initialState = (questions: QuizQuestion[]): QuizState => ({
  questions,
  currentQuestionIndex: 0,
  score: 0,
  selectedAnswer: null,
  isAnswered: false,
  isCompleted: false,
});

const quizReducer = (state: QuizState, action: QuizAction): QuizState => {
  switch (action.type) {
    case 'SELECT_ANSWER':
      const isCorrect = state.questions[state.currentQuestionIndex].correctAnswer === action.payload;
      return {
        ...state,
        selectedAnswer: action.payload,
        isAnswered: true,
        score: isCorrect ? state.score + 1 : state.score,
      };
    case 'NEXT_QUESTION':
      const nextIndex = state.currentQuestionIndex + 1;
      return {
        ...state,
        currentQuestionIndex: nextIndex,
        selectedAnswer: null,
        isAnswered: false,
        isCompleted: nextIndex >= state.questions.length,
      };
    case 'RESTART_QUIZ':
      return initialState(state.questions);
    default:
      return state;
  }
};

const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState(questions));
  
  const {
    currentQuestionIndex,
    score,
    selectedAnswer,
    isAnswered,
    isCompleted,
  } = state;

  const currentQuestion = questions[currentQuestionIndex];

  // Add animation classes for entry/exit
  const [animation, setAnimation] = React.useState('animate-fade-in');

  // Handle smooth question transitions
  const nextQuestion = () => {
    setAnimation('animate-fade-out');
    setTimeout(() => {
      dispatch({ type: 'NEXT_QUESTION' });
      setAnimation('animate-fade-in');
    }, 300);
  };

  // Add animation styles to document
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-10px); }
      }
      .animate-fade-in {
        animation: fadeIn 0.3s ease-out forwards;
      }
      .animate-fade-out {
        animation: fadeOut 0.3s ease-out forwards;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (isCompleted) {
    return <Results 
      score={score} 
      totalQuestions={questions.length} 
      onRestart={() => dispatch({ type: 'RESTART_QUIZ' })}
    />;
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
      <ProgressBar 
        current={currentQuestionIndex + 1} 
        total={questions.length} 
      />
      
      <div className={animation}>
        <Question
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          isAnswered={isAnswered}
          onSelectAnswer={(answer) => dispatch({ type: 'SELECT_ANSWER', payload: answer })}
        />
      </div>
      
      <div className="mt-8 flex justify-between items-center">
        <div className="text-sm font-medium text-gray-600">
          {isAnswered && (
            <span>Score: {score}/{currentQuestionIndex + 1}</span>
          )}
        </div>
        
        {isAnswered && (
          <button
            onClick={nextQuestion}
            className="flex items-center px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-300"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;