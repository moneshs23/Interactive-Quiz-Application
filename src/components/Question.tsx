import React from 'react';
import AnswerOption from './AnswerOption';
import { QuizQuestion } from '../types';

interface QuestionProps {
  question: QuizQuestion;
  selectedAnswer: string | null;
  isAnswered: boolean;
  onSelectAnswer: (answer: string) => void;
}

const Question: React.FC<QuestionProps> = ({ 
  question, 
  selectedAnswer, 
  isAnswered, 
  onSelectAnswer 
}) => {
  return (
    <div className="w-full transition-all duration-500 ease-out">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
        {question.question}
      </h2>
      
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <AnswerOption
            key={index}
            text={option}
            index={index}
            isSelected={selectedAnswer === option}
            isCorrect={isAnswered ? option === question.correctAnswer : null}
            isAnswered={isAnswered}
            onSelect={() => onSelectAnswer(option)}
          />
        ))}
      </div>
      
      {isAnswered && (
        <div className="mt-6 p-4 rounded-lg bg-gray-50 border border-gray-200">
          <p className="text-gray-700">
            <span className="font-medium">Correct answer: </span>
            {question.correctAnswer}
          </p>
        </div>
      )}
    </div>
  );
};

export default Question;