console.log("Before API TEST");
let resultsCount = 0;
let answer = 0;


const difficulty = function(difficulty){
    if(difficulty === "hard"){
        answer += 15;
    }else if(difficulty === "medium"){
        answer += 10;
    }else if(difficulty === "easy"){
        answer += 5;
    }
    return answer;
};

//chosen answer if correct should be added to total

//two
function apiReturnHandler(){
    if(this.readyState === 4 && this.status === 200){
        console.log(this.responseText);
        console.log(typeof this.responseText);
        
        let ques = JSON.parse(this.responseText);
        console.log(ques);
        console.log(typeof ques);

        let Question = document.getElementById('question').innerHTML = ques.results[resultsCount].question;
        console.log(Question);

        //dont forget that the radio buttons never rest
        let answerDifficulty = ques.results[resultsCount].difficulty;
        console.log("Answer Difficulty: " + answerDifficulty);
        document.getElementById('total').innerHTML = answer;
        console.log("Answer amount: " + answer)

        document.getElementById('answ1').innerHTML = ques.results[resultsCount].correct_answer;
        document.getElementById('answ2').innerHTML = ques.results[resultsCount].incorrect_answers[0];
        document.getElementById('answ3').innerHTML = ques.results[resultsCount].incorrect_answers[1];
        document.getElementById('answ4').innerHTML = ques.results[resultsCount].incorrect_answers[2];
        answer += difficulty(answerDifficulty);
        

        /*var questions = [correct, ranques1, ranques2, ranques3];
        var random1 = Math.floor(Math.random() * questions.length) ;
        var choice1 = questions[random1];*/

        console.log(ques.results[resultsCount].correct_answer);
        console.log(ques.results[resultsCount].incorrect_answers[0]);
        console.log(ques.results[resultsCount].incorrect_answers[1]);
        console.log(ques.results[resultsCount].incorrect_answers[2]);
        
        resultsCount++;
        
    }else{
        //console.log(this);
        console.log("API Status Changed: " + this.statusText);
    }

    if (this.status === 401){
        console.log("You are not authorized, Invalid API Key.");
    }
    if(this.status === 404){
        console.log("Function does not exist");
    }
}

function apiErrorHandler(error){
    console.log("Horrible error");
    console.log(error);
    console.log(this);
}

function apiProgressHandler(event){
    console.log(event);
    let percentLoaded = event.loaded / event.total;
    console.log("Percentage Loaded: " + percentLoaded);
    //update ui (pie chart) with current percentage
    //0-1
}

function apiTimeoutHandler(event){
    console.log(event);
    console.log("Request has taken too long");
}

//one
function callReqApi() {
    console.log("Setting up api url")
    let url ="https://opentdb.com/api.php?amount=10&type=multiple";

    console.log("Setting up http req object");
    let xHttp = new XMLHttpRequest();
    xHttp.onreadystatechange = apiReturnHandler;
    xHttp.onerror = apiErrorHandler;
    xHttp.onprogress = apiProgressHandler;
    //xHttp.timeout = 2000; //time in milliseconds
    //xHttp.ontimeout = apiTimeoutHandler;

    xHttp.open("GET", url, true);
    xHttp.send();
    console.log("Sending ASYNC");
}


//why is this bad practice //trying to put it in a function thats not supposed to call its self
const nextButton = document.getElementById("next");
nextButton.addEventListener("click", callReqApi, true);
console.log("Event Fired");

callReqApi();
console.log("AFTER API");






