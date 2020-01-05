// Variables
var qInfo, questionID, question, choiceA, choiceB, choiceC, choiceD, questions, numQuestions,
current = 0;
score = 0;
var points = [];

var defaultQuestions = [
    {
        question: "Great Whites and Hammerheads are what type of animals?",
        choiceA: "Crocodile",
        choiceB: "Shark",
        choiceC: "Whale",
        choiceD: "Dolphin",
        correct: "B"
    },

    {
        question: "In which year was Alaska sold to the U.S.?",
        choiceA: "1867",
        choiceB: "1865",
        choiceC: "1850",
        choiceD: "1869",
        correct: "A"
    },

    {
        question: "Who invented the telephone?",
        choiceA: "Frank Whittle",
        choiceB: "Charles Babbage",
        choiceC: "John Logie Baird",
        choiceD: "Alexander Graham Bell",
        correct: "D"
    },

    {
        question: "What’s the coloured part of the human eye called?",
        choiceA: "Sclera",
        choiceB: "Iris",
        choiceC: "Lens",
        choiceD: "Retina",
        correct: "B"
    },

    {
        question: "What is the world's longest river?",
        choiceA: "Ganges",
        choiceB: "Nile",
        choiceC: "Amazon",
        choiceD: "Missisippi",
        correct: "C"
    },

    {
        question: "How many rings make up the symbol of the Olympic Games?",
        choiceA: "1",
        choiceB: "3",
        choiceC: "6",
        choiceD: "5",
        correct: "D"
    }];

// HTML References
var elquiz = document.getElementById("quiz");
var elquestion = document.getElementById("question");
var elA = document.getElementById("choiceA");
var elB = document.getElementById("choiceB");
var elC = document.getElementById("choiceC");
var elD = document.getElementById("choiceD");
var elstatus = document.getElementById("quizStatus");
var choice = document.getElementsByName('choices');


// Start Quiz
populateQuestions();
renderQuestions();
document.getElementById("submit").onclick = gradeQuestion;

function populateQuestions() {
    //1st: Populate with default questions
    questions = defaultQuestions;
    //2nd: If local storage got question, add to question set
    if (localStorage.getItem('questions')) {
        var storedQuestions = JSON.parse(localStorage.getItem("questions"));
        for (var i = 0; i < storedQuestions.length; i++) {
            questions.push(storedQuestions[i]);
        }
    }
    numQuestions = questions.length - 1;
}

function populateQuestionInfo() {
    // Separate specific functionality into separate functions
    question = questions[current].question;
    qInfo = questions[current];
    choiceA = qInfo.choiceA;
    choiceB = qInfo.choiceB;
    choiceC = qInfo.choiceC;
    choiceD = qInfo.choiceD;
    correct = qInfo.correct;
}

function renderQuestions() {
    // display question on webpage
    questionID = current + 1;
    elstatus.innerHTML = "Question " + (questionID) + " of " + (numQuestions);
    populateQuestionInfo();
    elquestion.innerHTML = question;
    elA.innerHTML = choiceA;
    elB.innerHTML = choiceB;
    elC.innerHTML = choiceC;
    elD.innerHTML = choiceD;
}

function gradeQuestion() {
    var userChoice = document.querySelector("input[type='radio'][name='choices']:checked");
    if (userChoice) {
        if (userChoice.value == questions[current].correct) {
            score++;
            points.push(1);
            var position = questions.indexOf(current);
        }
        else {
            points.push(0);
        }
        current++;
        renderQuestions();

        if(current == questions.length -1){
            endGame();
        }
    }
    else{
        alert("Choose one")
    }
}

function endGame(){
    elquiz.innerHTML = "<h1>Your Score: " + score + " out of " + numQuestions + "</h1>";
    current = 1
    for(var i = 0; i < points.length; i++){
        var para = document.createElement("p");
        if(points[i] == 0){
            var node = document.createTextNode("Your answer for question " + current + " is incorrect." )
        }
        else{
            var node = document.createTextNode("Your answer for question " + current + " is correct." )
        }
        para.appendChild(node);
        elquiz.appendChild(para);
        current++;
    }
    document.getElementById("options").style.display = "block";
}
