
// To Retrieve a class used querySelector
const container = document.querySelector(".container");
const questionBox = document.querySelector(".question");
const optionsBox = document.querySelector(".options");
const nextBtn = document.querySelector(".nextBtn");
const scoreCard = document.querySelector(".scoreCard");
const startBtn = document.querySelector(".startBtn");
const alert = document.querySelector(".alert");
const timer = document.querySelector(".timer");
const wrapper = document.getElementById("wrapper");


//Array of objecs which stores que and answer//
const quiz = [
    {
        question: "Q.Which planet has 145 moons?",
        options:["Saturn","Mars","Mercury","Jupiter"],
        answer: "Saturn"
    },
    {
        question: "Q.In which country was the game of chess invented?",
        options:["India","China","Greece","Japan"],
        answer: "India"

    },
    {
        
        question: "Q.What was the first fruit to be eaten on the Moon?",
        options:["Grapes","A peach","A starfruit","Apple"],
        answer:"A peach"
    },
    {
        question: "Q.Which continent is home to the snow leopard?",
        options:["North America","Asia","South America","Africa"],
        answer:"Asia"

    },
    {
        question: "Q.What word appears on cold taps in Italy?",
        options:["Freddo","Froggie","Bruno","Carlo"],
        answer:"Freddo"

    },
    {
        question: "Q.Which country did Transylvania belong to from 11th century until 1918?",
        options:["Germany","Romania","Britain","Hungary"],
        answer:"Hungary"
    },
    {
        question: "Q.WHICH of these is NOT a recognised name for a young beaver?",
        options:["Mouse","Kit","Pup","Kitten"],
        answer:"Mouse"
    },
    {
        question: "Q.In Ancient Rome, how many days of the week were there?",
        options:["Five", "Eight", "Six", "Seven"],
        answer: "Eight"
    },

    {
        question: "Q.What is the primary gas that makes up the Earth’s atmosphere?",
        options:["Oxygen","Nitrogen","Carbon dioxide","Hydrogen"],
        answer: "Nitrogen"
    },
    {
        question: "Q.When was the world’s first ATM introduced, in Enfield, UK?",
        options:["1967","1977","1987","1997"],
        answer: "1967"
    },
];
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
}
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
    }

    //Function to show score
    const showScore = () => {
        questionBox.textContent = "";
        optionsBox.textContent = "";
        scoreCard.textContent = `You scored ${score} out of ${quiz.length}`;
        displayAlert("You have completed your Quiz");
        nextBtn.textContent = "Play Again";
        quizCompleted = true;
        timer.style.display = "none";
        } 

    //Function to show Alert
        const displayAlert = (message) => {
            alert.style.display = "block";
            alert.textContent = message;
            setTimeout(() => { 
                alert.style.display = "none";
            }, 1500);

        }

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
                    `
                }
            }
            timerId = setInterval(countDown,1000);
        }

    //Function to Stop timer after 30 countdowns
    const stopTimer = () =>{
        clearInterval(timerId);
    }

    //Function for Random Questions
    const randomQuestions = () =>{
        for(let i=quiz.length-1; i>0; i--){
            const j = Math.floor(Math.random() * (i+1));
            [quiz[i],quiz[j]] = [quiz[j], quiz[i]];
        }
        currentQuestionIndex = 0;
        showQuestion();
    }

    //Function to start quiz
    const startGame = () => {
        timeLeft = 30;
        timer.style.display = "flex";
        randomQuestions();
    }

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


