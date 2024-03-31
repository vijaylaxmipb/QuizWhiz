const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const optionsBox = document.querySelector('.options');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard')
const alert = document.querySelector('.alert');

//Array of objecs which stores que and answer//
const quiz = [
    {
        question: "Q1.Which planet has 145 moons?",
        options:["Saturn","Mars","Mercury","Jupiter"],
        answer: "Saturn"
    },
    {
        question: "Q2.In which country was the game of chess invented?",
        options:["India","China","Greece","Japan"],
        answer: "India"

    },
    {
        
        question: "Q3.What was the first fruit to be eaten on the Moon?",
        options:["Grapes","A peach","A starfruit","Apple"],
        answer:"A peach"
    },
    {
        question: "Q4.Which continent is home to the snow leopard?",
        options:["North America","Asia","South America","Africa"],
        answer:"Asia"

    },
    {
        question: "Q5.What word appears on cold taps in Italy?",
        options:["Freddo","Froggie","Bruno","Carlo"],
        answer:"Freddo"

    },
    {
        question: "Q6.Which country did Transylvania belong to from 11th century until 1918?",
        options:["Germany","Romania","Britain","Hungary"],
        answer:"Hungary"
    },
    {
        question: "Q7.WHICH of these is NOT a recognised name for a young beaver?",
        options:["Mouse","Kit","Pup","Kitten"],
        answer:"Mouse"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let quizCompleted =false;

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
            if(optionDiv.classList.contains('selected')){
               optionDiv.classList.remove('selected');
            }else{
                optionDiv.classList.add('selected');
            }
        });
    }
}
    //Function for checking answers
    const checkAnswer = () => {
        const selectedOption = document.querySelector('.option.selected');
        if(selectedOption.textContent === quiz[currentQuestionIndex].answer){
           //alert("Correct Answer");
           showAlert("Correct Answer");
           score++;
        }else{
            //alert("Incorrect Answer");  
        }  showAlert("Incorrect Answer");
        currentQuestionIndex++;
        if(currentQuestionIndex < quiz.length){
             showQuestion();
         }else{
            showScore();
            quizCompleted = true;
         }
    }

    //Function to show score
    const showScore = () =>{
        questionBox.textContent = "";
        optionsBox.textContent ="";
        scoreCard.textContent = `You scored ${score} out of ${quiz.length}`;
        showAlert("You have completed your Quiz");
        nextBtn.textContent = "Play Again";
       // nextBtn.addEventListener('click', () =>{
          //  currentQuestionIndex = 0;
           // showQuestion();
           // nextBtn.textContent = "Next";
           // scoreCard.textContent = ""; 
        //});
        }
    //Function to show Alert
        const showAlert = () =>{
            alert.style.show = "block";
            alert.textContent = message;

        }

    showQuestion();
    nextBtn.addEventListener('click',()=>{
        const selectedOption = document.querySelector('.option.selected');
        if(!selectedOption && nextBtn.textContent === "Next"){
            //alert("Select your answer");
            showAlert("Select Your Answer");
            return;
        }
        if(quizCompleted){
            nextBtn.textContent = "Next";
            scoreCard.textContent ="";
            currentQuestionIndex = 0;
            showQuestion();
            quizCompleted = false;
            score = 0;
        }
        else{
            checkAnswer();
        }
        
        
    });

