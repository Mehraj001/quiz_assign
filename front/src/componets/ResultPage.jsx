import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from "styled-components"

function ResultPage() {
  const location = useLocation();
  const { score } = location.state || { score: 0 };

  return (
    <StyledDiv >
      <div className="cont">
        <div className="name">
          <h2>Your Performance in quiz is:</h2>
        </div>
        <div className="score">
        <p className='span'>Your score is: <span>{score}</span> / 4</p>
        </div>
      </div>
     <div className="back_quiz">
     <a href="/"><span className='aro'>&larr;</span> Go back to Quiz</a>
     <a href="/spech"> Specch to Text <span className='aro'>&rarr;</span></a>
     </div>
 
    </StyledDiv>
  );
}
const StyledDiv=styled.div`
        *{
          padding: 0;
          margin: 0;
        }
      .cont{
        height: 50vh;
        width: 50vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: bisque;
        border-radius: 30px;
       
      }
      .back_quiz{
        display: flex;
        justify-content: center;
        gap: 70px;
      }
      .back_quiz a{
        text-decoration: none;
        color: #0a0a0a;
        background-color: #eae4dc;
        margin-top: 5px;
        gap: 5px;
      }
      .name{
        display: flex;
        padding-top: 1px;
      }
      .score{
        margin-top: 20px;
      }
      .span{
        font-size: 25px;
        color: #090909;
      }
      span{
        color: #4b6ed6;
      }
      .aro{
        size: 25px;
      }
          
      `

export default ResultPage;

