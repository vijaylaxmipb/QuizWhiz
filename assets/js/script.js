const questions = [
    {
        question: "Which planet has 145 moons?",
        answers:[
            { text: "Saturn", correct: true},
            { text: "Mars", correct: false},
            { text: "Mercury", correct: false},
            { text: "Jupiter", correct: false},
        ]
    },
    {
        question: "In which country was the game of chess invented?",
        answers:[
            { text: "India", correct: true},
            { text: "China", correct: false},
            { text: "Greece", correct: false},
            { text: "Japan", correct: false},
        ]

    },
    {
        
        question: "What was the first fruit to be eaten on the Moon?",
        answers:[
            { text: "Grapes", correct: false},
            { text: "A peach", correct: true},
            { text: "A starfruit", correct: false},
            { text: "Apple", correct: false},
        ]
    },
    {
        question: "Which continent is home to the snow leopard?",
        answers:[
            { text: "North America", correct: false},
            { text: "Asia", correct: true},
            { text: "South America", correct: false},
            { text: "Africa", correct: false},
        ]
    },
    {
        question: "What word appears on cold taps in Italy?",
        answers:[
            { text: "Freddo", correct: true},
            { text: "Froggie", correct: false},
            { text: "Bruno", correct: false},
            { text: "Carlo", correct: false},
        ]
    },
    {
        question: "Which country did Transylvania belong to from 11th century until 1918?",
        answers:[
            { text: "Germany", correct: false},
            { text: "Romania", correct: false},
            { text: "Britain", correct: false},
            { text: "Hungary", correct: true},
        ]

    },
    {
        question: "WHICH of these is NOT a recognised name for a young beaver?",
        answers:[
            { text: "Mouse", correct: true},
            { text: "Kit", correct: false},
            { text: "Pup", correct: false},
            { text: "Kitten", correct: false},
        ]

    }
];

const question = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const option4 = document.getElementById("option4");
const playAgain = document.getElementById("playAgain");
const heading = document.getElementById("heading");
const score = document.getElementById('score');


let currentQuestionIndex = 0;
let scoreAmount = 0;


function startQuiz(){
    currentQuestionIndex = 0;
    scoreAmount = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

  
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    question.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstpChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");   
    }else{
        selectedBtn.classList.add("inCorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

startQuiz();

