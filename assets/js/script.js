
/* jshint esversion: 6 */
import { questions } from './questions.js';


// To Retrieve a class used querySelector
const container = document.querySelector(".container");
const questionBox = document.querySelector(".question");
const optionsBox = document.querySelector(".options");
const nextBtn = document.querySelector(".nextBtn");
const scoreCard = document.querySelector(".scoreCard");
const startBtn = document.querySelector(".startBtn");
const alerts = document.querySelector(".alert");
const timer = document.querySelector(".timer");
const wrapper = document.getElementById("wrapper");
const mode = document.getElementById('mode');
const closeModeBtn = document.querySelector('.close-mode');
const openModeBtn = document.querySelector('.open-mode');

const quiz = questions;

 //Variables
let currentQuestionIndex = 0;
let score = 0;
let quizCompleted = false;
let timeLeft = 30;
let timerId = null;

//Arrow functions
const showQuestion = () => {
    //console.log("Question");
    const questionElement = quiz[currentQuestionIndex];
    questionBox.textContent = questionElement.question;

    optionsBox.textContent = "";
    for(let i=0; i < questionElement.options.length; i++){
        const currentOption = questionElement.options[i];
        const optionDiv = document.createElement('div');
        optionDiv.textContent = currentOption;
        optionDiv.classList.add('option');
        optionsBox.appendChild(optionDiv);

        optionDiv.addEventListener('click', ()=>{
            // First, remove 'choose' class from all options
          const allOptions = document.querySelectorAll('.options .option');
          allOptions.forEach(opt => {
              opt.classList.remove('choose');
          });
          
          // Then, add 'choose' class to the clicked option
          optionDiv.classList.add('choose');
      });
  }

    if(currentQuestionIndex < quiz.length){
        startTimer();
    }
};
    //Function for checking answers
    const checkAnswer = () => {
        const chooseOption = document.querySelector('.option.choose');
        if(chooseOption.textContent === quiz[currentQuestionIndex].answer){
           //alert("Correct Answer");
           displayAlert("Correct Answer");
           score++;
        }else{
            displayAlert(`Incorrect Answer!! ${quiz[currentQuestionIndex].answer} is correct Answer`);  
        }  
        timeLeft = 30;
        currentQuestionIndex++;
        if(currentQuestionIndex < quiz.length){
             showQuestion();
         }else{
            stopTimer();
            showScore(); 
            quizCompleted = true;
         }
    };

    //Function to show score
    const showScore = () => {
        questionBox.textContent = "";
        optionsBox.textContent = "";
        scoreCard.textContent = `You scored ${score} out of ${quiz.length}`;
        displayAlert("You have completed your Quiz");
        nextBtn.textContent = "Play Again";
        quizCompleted = true;
        timer.style.display = "none";
        };

    //Function to show Alert
        const displayAlert = (message) => {
            alerts.style.display = "block";
            alerts.textContent = message;
            setTimeout(() => { 
                alerts.style.display = "none";
            }, 1500);

        };

    //Function to start Timer
        const startTimer = () =>{
            clearInterval(timerId);
            timer.textContent = timeLeft;

            
            const countDown = () =>{
                timeLeft--;
                timer.textContent = timeLeft;
                if(timeLeft === 0){
                    wrapper.innerHTML = `<h1>You ran out of time!</h1>
                    <button class="startBtn" onclick="{window.location.reload();}">Try Again</button>
                    `;
                }
            };
            timerId = setInterval(countDown,1000);
        };

    //Function to Stop timer after 30 countdowns
    const stopTimer = () =>{
        clearInterval(timerId);
    };

    //Function for Random Questions
    const randomQuestions = () =>{
        for(let i=quiz.length-1; i>0; i--){
            const j = Math.floor(Math.random() * (i+1));
            [quiz[i],quiz[j]] = [quiz[j], quiz[i]];
        }
        currentQuestionIndex = 0;
        showQuestion();
    };

    //Function to start quiz
    const startGame = () => {
        timeLeft = 30;
        timer.style.display = "flex";
        randomQuestions();
    };

    document.addEventListener('DOMContentLoaded', function() {
        // Function to open mode
        function openMode() {
            mode.style.display = 'block';
        }
    
        // Function to close mode
        function closeMode() {
            mode.style.display = 'none';
        }
    
        // Event listener for opening mode
        openModeBtn.addEventListener('click', openMode);
    
        // Event listener for closing mode
        closeModeBtn.addEventListener('click', closeMode);
    
        // Event listener for clicking outside the mode to close
        window.addEventListener('click', function(event) {
            if (event.target === mode) {
                closeMode();
            }
        });
    
        // Event listener for start button to hide mode if open
        startBtn.addEventListener('click', function() {
            if (mode.style.display === 'block') {
                closeMode();
            }
        });
    });
 
    //Add Event Listner to Start Btn
    startBtn.addEventListener('click',() =>{
        startBtn.style.display ="none";
        container.style.display ="block";

        startGame();
    });

    
    //showQuestion();
    nextBtn.addEventListener('click',() =>{
        const chooseOption = document.querySelector('.option.choose');
        if(!chooseOption && nextBtn.textContent === "Next"){
            //alert("Select your answer");
            displayAlert("Select Your Answer");
            return;
        }
        if(quizCompleted){
            nextBtn.textContent = "Next";
            scoreCard.textContent ="";
            currentQuestionIndex = 0;
            showQuestion();
            quizCompleted = false;
            score = 0;
            startGame();
        }
        else{
            checkAnswer();
        }  
        
    });


