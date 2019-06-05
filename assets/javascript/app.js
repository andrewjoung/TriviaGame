//TODO:
//adjust the timer
// ======> we want it to display once the start button is pressed (manipulate the mainScreen div)
//      =====> have mainScreen not display and then display once start is pressed 
// ======> stop once the game is ended
// ======> have it display "Time Remaining: <time> seconds"
//write code to make game stop once all questions are done iterating
//display number correct and reset the game once all questions are answered 



$(document).ready(function() {

    //an array of objects that hold the questions, an array of possible answers, and the actual answer
    var questionOptions = [
    
        {
            question:"Who said 'chaos is a ladder'?", 
            answerOptions:["Varys", "Ned Stark", "Peter Baelish", "Ser Davos"],
            correctAnswer:"Peter Baelish" 
        },
    
        {
            question: "Which one of Daenerys Targaryen's dragons is the biggest?",
            answerOptions: ["Drogon", "Rhaegal", "Viserion"],
            correctAnswer: "Drogon"
        },

        {
            question: "What is Jon Snow's real name?",
            answerOptions: ["Jon Stark", "Aegon Targaryen", "Jon Lannister", "Rhaegar Targaryen"],
            correctAnswer: "Aegon Targaryen"
        },

        {
            question: "Who is Jon Snow's real father?",
            answerOptions: ["Ned Stark", "Rhaegar Targaryen", "Tyrion Lannister", "Devos Seaworth"],
            correctAnswer: "Rhaegar Targaryen"
        },

        {
            question: "Who killed Tywin Lannister?",
            answerOptions: ["Tyrion Lannister", "Jamie Lannister", "Ned Stark", "Stannis Baratheon"],
            correctAnswer: "Tyrion Lannister"
        },

        {
            question: "Fill in the blank: The free city of ____________ ",
            answerOptions: ["Bravos", "Westeros", "Maureen", "Winterfell"],
            correctAnswer: "Bravos"
        }
        
    ];
    
    var currentQuestionIndex = 0; //global variable that is used to iterate through the question array
    var selectedAnswer = ""; //the answer the user selects
    var actualAnswer = ""; //the actual answer to the question
    var numCorrect = 0; //the number of questions the user gets correct
    var numIncorrect = 0; //the number of questions the user gets incorrect
    //var timerValue = 10; // ===> manipulate with setTimeout() that runs every 1000 ms, timer-- to have timer go down every second 
    var interval;

    //console.log(questionOptions[1].question);
    
    /*
    for(var i = 0; i < questionOptions.length; i++) {
        console.log(questionOptions[i].question);
        var currentQuestion = questionOptions[i];
        for(var j = 0; j < currentQuestion.answerOptions.length; j++) {
            console.log(currentQuestion.answerOptions[j]);
        }
        console.log(questionOptions[i].correctAnswer);
    }
    */

    $("#startButton").on("click", function(){
        $("#startingScreen").css("display", "none");
        startGame();
    });

    //function that initalizes the timer
    function initalizeTimer () {
        //timer 
        var timerValue = 10;

        interval = setInterval(function() {
            $("#timer").text(timerValue);
            timerValue--;
            if(timerValue === -1) {
                clearInterval(interval);
                timesUp();
            }
        }, 1000); 
    }

    function startGame() {
        var questionScreen = $("#questionScreen");
        var mainScreen = $("#mainScreen");

        //initalize the timer whenever the game starts;
        initalizeTimer();

        //get the currentQuestion based on which question we are at 
        var currentQuestion = questionOptions[currentQuestionIndex];
        actualAnswer = questionOptions[currentQuestionIndex].correctAnswer;
        var question = $("#question");
        question.text(currentQuestion.question);
        //mainScreen.prepend(question);
        var options = currentQuestion.answerOptions;

        for(var i = 0; i < options.length; i++) {

            var answerText = $("<p>");
            answerText.text(options[i]);
            answerText.addClass("answerOptions");
            answerText.attr("id", options[i]);

            questionScreen.append(answerText);
        }

        
        console.log(options);
        var questionElementChildren = questionScreen.children(); // ====> returns an array with the children of the div 
        
        console.log(questionElementChildren);


        //apply the same click function to all children of the question screen div
        questionScreen.children().on("click", function() {
            //the item that is actually clicked
            selectedAnswer = this.innerText;
            //console.log(selectedAnswer);
            //console.log(actualAnswer);
            clearInterval(interval);

            $("#timer").empty();
            $("#questionScreen").css("display", "none");
            $("#answerScreen").css("display", "block");
            var answerHeading = $("<h1>");
            if(selectedAnswer === actualAnswer) {
                answerHeading.text("You are correct!");
                numCorrect++;
            } else if (selectedAnswer !== actualAnswer) {
                answerHeading.text("Nope! The correct answer is " + actualAnswer);
                numIncorrect++;
            }
            //answerHeading.text(selectedAnswer);
            var nextButton = $("<button>");
            nextButton.text("next question");
            nextButton.on("click", function() {
                /*
                currentQuestionIndex++;
                questionScreen.empty();
                $("#answerScreen").empty();
                $("#mainScreen > h2").empty(); //might be able to get rid of this
                $("#questionScreen").css("display", "block");
                $("#answerScreen").css("display", "none");
                startGame();
                */
                resetScreen();
            });

            $("#answerScreen").append(answerHeading);
            $("#answerScreen").append(nextButton);
            //this allows us to move through the question array 
            //currentQuestionIndex++;
        });


    }

    //this function is called when the timer runs out
    //can probably use this in the function above to clear the screen and what not
    function timesUp() {
        $("#questionScreen").css("display", "none");
        $("#answerScreen").css("display", "block");
        var answerHeading = $("<h1>");
        answerHeading.text("you ran out of time!");
        $("#answerScreen").append(answerHeading);
        setTimeout(function(){
            /*
            currentQuestionIndex++;
            $("#questionScreen").empty();
            $("#answerScreen").empty();
            $("#mainScreen > h2").empty(); //might be able to get rid of this
            $("#questionScreen").css("display", "block");
            $("#answerScreen").css("display", "none");
            startGame();
            */
           resetScreen();
        }, 3000);
    }

    function resetScreen() {
        currentQuestionIndex++;
        $("#questionScreen").empty();
        $("#answerScreen").empty();
        $("#mainScreen > h2").empty(); //might be able to get rid of this
        $("#questionScreen").css("display", "block");
        $("#answerScreen").css("display", "none");
        startGame();
    }

});

