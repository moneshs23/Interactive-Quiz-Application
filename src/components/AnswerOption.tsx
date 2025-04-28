import React from 'react';

interface AnswerOptionProps {
  text: string;
  index: number;
  isSelected: boolean;
  isCorrect: boolean | null;
  isAnswered: boolean;
  onSelect: () => void;
}

const AnswerOption: React.FC<AnswerOptionProps> = ({ 
  text, 
  index, 
  isSelected, 
  isCorrect, 
  isAnswered, 
  onSelect 
}) => {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  
  // Determine the background color based on selection and correctness
  const getBgColor = () => {
    if (!isAnswered) return isSelected ? 'bg-indigo-100 border-indigo-500' : 'bg-white hover:bg-gray-50';
    if (isSelected && isCorrect) return 'bg-green-100 border-green-500';
    if (isSelected && !isCorrect) return 'bg-red-100 border-red-500';
    if (!isSelected && isCorrect) return 'bg-green-50 border-green-500';
    return 'bg-white opacity-70';
  };

  return (
    <button
      className={`flex items-center w-full p-4 mb-3 border-2 rounded-lg transition-all duration-300 ${getBgColor()}`}
      onClick={onSelect}
      disabled={isAnswered}
    >
      <div className={`flex items-center justify-center w-8 h-8 mr-3 rounded-full ${isSelected ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
        {letters[index]}
      </div>
      <span className="text-left text-gray-800">{text}</span>
      
      {isAnswered && isSelected && isCorrect && (
        <span className="ml-auto text-green-600">✓</span>
      )}
      
      {isAnswered && isSelected && !isCorrect && (
        <span className="ml-auto text-red-600">✗</span>
      )}
    </button>
  );
};

export default AnswerOption;