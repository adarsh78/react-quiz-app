import React, { useRef, useState } from 'react'
import { data } from '../assets/data'

const Quiz = () => {

    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(data[index]);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);

    const option1 = useRef(null);
    const option2 = useRef(null);
    const option3 = useRef(null);
    const option4 = useRef(null);

    const optionArray = [option1, option2, option3, option4];

    const checkAnswer = (e, ans) => {
        if(lock === false) {
            if (ans === question.ans) {
                e.target.classList.add("bg-green-300", "border", "border-solid", "border-green-700");
                setLock(true);
                setScore(prev => prev + 1)
              } else {
                e.target.classList.add("bg-red-300", "border", "border-solid", "border-red-700");
                setLock(true);
                optionArray[question.ans-1].current.classList.add("bg-green-300", "border", "border-solid", "border-green-700");
            }
        }
      }

      const nextButton = () => {
       if(lock === true) {
        if(index === data.length-1){
            setResult(true)
            return 0;
        }
        setIndex(prev => prev + 1);
        setQuestion(data[index+1]);
        setLock(false);
        optionArray.map((option) => {
            option.current.classList.remove("bg-green-300", "border", "border-solid", "border-green-700");
            option.current.classList.remove("bg-red-300", "border", "border-solid", "border-red-700");
            return null;
        })
       }
      }


      const resetButton = () => {
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setLock(false);
        setResult(false)
      }

  return (
    <div className='bg-white p-10 rounded-md w-[640px] m-auto flex flex-col gap-[20px]'>
        <h1 className='text-2xl font-medium'>Quiz App</h1>
        <hr className='h-[2px] border border-none bg-[#707070]'/>
        {result ? <>
        <h4 className='text-2xl font-medium'>You Scored {score} out of  {data.length}</h4>
        <button 
        onClick={resetButton}
        className='m-auto w-[250px] h-[65px] bg-[#553f9a] text-white text-2xl font-medium rounded-md cursor-pointer'>Reset</button>
        </> : <>
        <div>
            <h2 className='text-2xl font-medium mb-8'>{index+1}. {question.question}</h2>
            <ul>
                <li ref={option1} onClick={(e) => checkAnswer(e,1)}>{question.option1}</li>
                <li ref={option2} onClick={(e) => checkAnswer(e,2)}>{question.option2}</li>
                <li ref={option3} onClick={(e) => checkAnswer(e,3)}>{question.option3}</li>
                <li ref={option4} onClick={(e) => checkAnswer(e,4)}>{question.option4}</li>
            </ul>
        </div>
        <button 
        onClick={nextButton}
        className='m-auto w-[250px] h-[65px] bg-[#553f9a] text-white text-2xl font-medium rounded-md cursor-pointer'>Next</button>
        <div className='m-auto text-xl '>{index+1} of {data.length} Question</div>

        </>}
        
    </div>
  )
}

export default Quiz