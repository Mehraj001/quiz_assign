import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/questions')
      .then(response => {
        const shuffledQuestions = response.data.map(question => {
          if (question.question_type === 'mcq') {
            const options = [
              question.option_1,
              question.option_2,
              question.option_3,
              question.option_4,
            ].filter(Boolean); 
            return { ...question, shuffledOptions: shuffleArray(options) };
          }
          return question;
        });
        setQuestions(shuffledQuestions);
      })
      .catch(error => console.error('Error occurred:', error));
  }, []);

  const handleChange = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/submit', { answers })
      .then(response => {
        const score = response.data.score;
        navigate('/result', { state: { score } }); 
      })
      .catch(error => console.error('Error submitting answers:', error));
  };

  const shuffleArray = (array) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const backgroundColors = ['#f8d7da', '#d4edda', '#d1ecf1', '#fff3cd', '#f5c6cb'];

  return (
    <div className="App">
      <h1>Student Quiz</h1>
      <h3>Read each question carefully and answer all questions.</h3>
      <form onSubmit={handleSubmit}>
        {questions.length > 0 ? (
          questions.map((question, index) => (
            <div
              key={question.id}
              style={{ 
                backgroundColor: backgroundColors[index % backgroundColors.length], padding: '15px', margin: '10px 0', borderRadius: '8px' }}
            >
              <h3>{index + 1}. {question.question_text}</h3>
              {
              question.question_type === 'mcq' && (
                <>
                  {question.shuffledOptions.map((option, idx) => (
                    <label key={idx}>
                      <input
                        type="radio"
                        name={question.id}
                        value={option}
                        onChange={(e) => handleChange(question.id, e.target.value)}
                      />
                      {option}
                    </label>
                  ))}
                </>
              )}
              {
              question.question_type === 'fill_in_the_blank' && (
                <input type="text" onChange={(e) => handleChange(question.id, e.target.value)} placeholder="Your answer" />
              )}
              {
              question.question_type === 'descriptive' && (
                <textarea maxLength="50" onChange={(e) => handleChange(question.id, e.target.value)} placeholder="Write your answer (max 50 words )" />
              )}
            </div>
          ))
        ) : (
          <p>Loading questions...</p>
        )}
        <button type="submit">Submit Quiz</button> 


      </form>
    </div>
  );
}


export default QuizPage;
