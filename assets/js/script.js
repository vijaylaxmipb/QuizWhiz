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

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionsIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
    });

}

startQuiz();

