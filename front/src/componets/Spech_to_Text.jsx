
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import {useState} from "react";
import styled from "styled-components"

const App = () => {
    const [textToCopy, setTextToCopy] = useState();
    const [isCopied, setCopied] = useClipboard(textToCopy, {
        successDuration:1000
    });

    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return null
    }

    return (
        <StyledDiv>
        
            <div className="container">
                <h2>Speech to Text</h2>
                <br/>
                <div className="main-content" onClick={() =>  setTextToCopy(transcript)}>
                    {transcript}
                </div>
             

                <div className="btn-style">

                    <button onClick={setCopied}>
                        {isCopied ? 'Copied!' : 'Copy to clipboard'}
                    </button>
                    <button onClick={startListening}>Start Listening</button>
                    <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>

                </div>
                <div className="back_quiz">
                <a href="/"><span className='aro'>&larr;</span> Go back to Quiz</a>
    
     </div>

            </div>

        </StyledDiv>
    );
};
const StyledDiv=styled.div`

@import url("https://fonts.googleapis.com/css2?family=Inter&family=Lato&family=Libre+Baskerville&family=Merriweather:wght@700&family=Work+Sans&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Work Sans", sans-serif;
}

html {
  color: rgb(96 101 123);
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  background: rgb(255 255 255);
}

.container {
  padding: 30px;
  margin-top: 80px;
}

h2 {
  color: rgb(43 45 56);
  text-align: center;
  font-size: 48px;
  letter-spacing: -0.2px;
  font-family: "Merriweather", serif;
}

p {
  max-width: 50rem;
  text-align: center;
  margin-top: 24px;
  margin-bottom: 100px;
}

.main-content {
  max-width: 50rem;
  width: 100%;
  min-height: 400px;
  height: auto;
  padding: 18px 18px 120px 18px;
  position: relative;
  resize: none;
  box-shadow: 0 12px 48px 0px rgb(109 117 141 / 20%);
  background: rgb(255 255 255);
  border: 0.5px solid rgb(231 233 245);
  border-radius: 16px;
}

.main-content:focus {
  border: 0.3px solid rgb(43, 45, 56, 0.3);
  outline: none;
}

p,
.main-content {
  font-size: 18px;
  letter-spacing: 1px;
  word-spacing: 2px;
  line-height: 1.6;
}

.btn-style{
  display: flex;

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

button {

  background: rgb(17 166 131);
  color: rgb(255 255 255);
  border-radius: 6px;
  padding: 16px 32px;
  border: none;
  font-size: 18px;
  letter-spacing: 1px;
  margin: auto;
  display: flex;
  position: relative;
  margin-top: -80px;
  cursor: pointer;
}

button:focus,
button:hover {
  background: rgb(42, 201, 164);
  box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.1);
}
.counter-container {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}

@media screen and (max-width: 768px) {
  .container {
    margin-top: 20px;
  }

  h2 {
    font-size: 28px;
  }

  p {
    font-size: 16px;
    word-spacing: normal;
    margin-bottom: 40px;
    margin-top: 15px;
  }

  .main-content {
    font-size: 16px;
    word-spacing: normal;
  }

  button {
    padding: 12px 28px;
    font-size: 16px;
    margin-top: -70px;
  }

  .counter-container {
    flex-direction: column;
  }

  .counter-container p:first-child {
    margin-bottom: 0;
  }
}

`;

export default App;