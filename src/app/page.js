"use client";
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';
import '../styles/home.style.css';

export default function Home() {
  const [scores, setScores] = useState({ exam1: '', exam2: '', exam3: '', exam4: '', exam5: '', exam6: '' });
  const [result, setResult] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [width, height] = useWindowSize();

  const handleChange = (e) => {
    setScores({ ...scores, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    let timer;
    if (showConfetti) {
      setFadeOut(false);
      timer = setTimeout(() => setFadeOut(true), 3000);
    }
    return () => clearTimeout(timer);
  }, [showConfetti]);

  useEffect(() => {
    if (fadeOut) {
      const fadeTimer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(fadeTimer);
    }
  }, [fadeOut]);

  const submitForm = (e) => {
    e.preventDefault();
    const { exam1, exam2, exam3, exam4, exam5, exam6 } = scores;
    const average1 = (parseFloat(exam1) * 30 / 100) + (parseFloat(exam2) * 30 / 100) + (parseFloat(exam3) * 40 / 100);
    const average2 = (parseFloat(exam4) * 30 / 100) + (parseFloat(exam5) * 30 / 100) + (parseFloat(exam6) * 40 / 100);
    const finalResult = (average1 + average2) / 2;

    setResult(finalResult);
    setShowConfetti(finalResult >= 60);
  };
  
  return (
    <div className="container mx-auto scroll-my-12 overflow-auto p-14 min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-lg space-y-6 text-center">
        <h1 className="text-white text-3xl">MÜYYES Ortalama Hesaplama</h1>
        <form onSubmit={submitForm}>
          {['exam1', 'exam2', 'exam3', 'exam4', 'exam5', 'exam6'].map((exam, index) => (
            <div key={index} className='mb-4'>
              <input
                type="number"
                required
                id={exam}
                name={exam}
                value={scores[exam]}
                onChange={handleChange}
                placeholder={`${index + 1}. Sınav Notu`}
                className="p-3 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 text-black"
              />
            </div>
          ))}
          <div className='text-center'>
            <button type="submit" className="p-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75">
              Hesapla
            </button>
          </div>
        </form>
        {result !== null && (
          <div className='text-white text-3xl'>Ortalamanız: {result.toFixed(2)}</div>
        )}
        {showConfetti && (
          <div className={fadeOut ? 'confetti-fade-out' : ''}>
            <Confetti width={width} height={height} />
          </div>
        )}
      </div>
    </div>
  );
}
