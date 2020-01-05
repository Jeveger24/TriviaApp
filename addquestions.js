var questionForm = document.getElementById("add-question");
questionForm.onsubmit = processForm;

function processForm(){
    var newQuestion = {
        question: questionForm.question.value,
        choiceA: questionForm.choiceA.value,
        choiceB: questionForm.choiceB.value,
        choiceC: questionForm.choiceC.value,
        choiceD: questionForm.choiceD.value,
        correct: questionForm.correct.value
    };

    if(localStorage.getItem("questions")){
        var questionsArray = JSON.parse(localStorage.getItem("questions"));
        questionsArray.push(newQuestion);
        localStorage.setItem("questions", JSON.stringify(questionsArray));
    }
    questionForm.reset();
}