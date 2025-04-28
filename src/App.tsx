import React from 'react';
import Quiz from './components/Quiz';
import { quizQuestions } from './data/quizData';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col items-center justify-center px-4 py-12">
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-2">
          Knowledge Quiz
        </h1>
        <p className="text-slate-600 max-w-md">
          Test your knowledge with our interactive quiz. Answer the questions and see how well you score!
        </p>
      </header>
      
      <main className="w-full max-w-2xl">
        <Quiz questions={quizQuestions} />
      </main>
      
      <footer className="mt-8 text-center text-sm text-slate-500">
        <p>© 2025 Knowledge Quiz. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;