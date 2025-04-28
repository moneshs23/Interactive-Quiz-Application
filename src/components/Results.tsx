import React from 'react';
import { QuizQuestion } from '../types';
import { CheckCircle, XCircle } from 'lucide-react';

interface ResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ score, totalQuestions, onRestart }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  let message = "Try again!";
  let messageColor = "text-amber-600";
  
  if (percentage >= 80) {
    message = "Excellent job!";
    messageColor = "text-green-600";
  } else if (percentage >= 60) {
    message = "Good work!";
    messageColor = "text-teal-600";
  } else if (percentage >= 40) {
    message = "Nice effort!";
    messageColor = "text-indigo-600";
  }

  return (
    <div className="w-full max-w-lg mx-auto text-center animate-fade-in">
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz Completed!</h2>
        
        <div className="flex justify-center mb-6">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle 
                className="text-gray-200" 
                strokeWidth="8" 
                stroke="currentColor" 
                fill="transparent" 
                r="42" 
                cx="50" 
                cy="50" 
              />
              <circle 
                className="text-indigo-600 transition-all duration-1000 ease-out"
                strokeWidth="8" 
                strokeDasharray={264}
                strokeDashoffset={264 - (percentage / 100 * 264)} 
                strokeLinecap="round" 
                stroke="currentColor" 
                fill="transparent" 
                r="42" 
                cx="50" 
                cy="50" 
              />
            </svg>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <span className="text-3xl font-bold text-gray-800">{percentage}%</span>
            </div>
          </div>
        </div>
        
        <p className={`text-xl font-semibold ${messageColor} mb-2`}>{message}</p>
        <p className="text-gray-600 mb-6">You scored {score} out of {totalQuestions} questions correctly.</p>
        
        <div className="flex justify-center">
          <button 
            onClick={onRestart}
            className="flex items-center justify-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-300"
          >
            Take Quiz Again
          </button>
        </div>
      </div>
      
      <div className="text-left">
        <p className="text-sm text-gray-500 mb-4">
          Thank you for completing the quiz! We hope you enjoyed testing your knowledge.
        </p>
      </div>
    </div>
  );
};

export default Results;