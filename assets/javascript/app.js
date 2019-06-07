//TODO:
//fix timer display so that when time out it goes back to 10

//Author: Andrew Joung
//June 6th, 2019
//This is a JavaScript file that adds functionality to the Trivia Game. 
//The code uses the jQuery library to dynamically manipulate the DOM to allow
//the user to see questions and answers to play a timed trivia game.



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
    var interval; //a variable that holds our interval function

    //when the start button is clicked, we stop displaying the initial start screen andb begin the game
    $("#startButton").on("click", function(){
        $("#startingScreen").css("display", "none");
        $("#questionScreen").css("display", "block");
        startGame();
    });

    //function that initalizes the timer
    function initalizeTimer () {

        //we set the timer value to 9 because the number 10 is already displayed and there is a slight 
        //delay when setting interval functions
        var timerValue = 9; 

        interval = setInterval(function() {
            $("#timer").text(timerValue);
            timerValue--;
            if(timerValue === -1) { //if the user has ran out of time 
                clearInterval(interval); //stop the timer 
                timesUp(); //show the user that they have ran out of time
            }
        }, 1000); 
    }

    function startGame() { 

        //grabs the div with id questionScreen in which we will display the questions
        var questionScreen = $("#questionScreen");

        //if we have not gone through the question array
        if(currentQuestionIndex < questionOptions.length) {
            
            //initalize the timer when the game starts
            $("#timerText").css("display", "block");
            $("#timer").text("10");
            initalizeTimer();

            //get the currentQuestion based on which question we are at 
            var currentQuestion = questionOptions[currentQuestionIndex];
            actualAnswer = questionOptions[currentQuestionIndex].correctAnswer;

            var question = $("#question"); //the h2 tag in which the question will be written
            question.text(currentQuestion.question);

            //the list of possible answers to the current questions 
            var options = currentQuestion.answerOptions;

            //loop through the answer options and for each answer, we create a new <p> tag to write the answers to
            //and append them to the question screen 
            for(var i = 0; i < options.length; i++) {

                var answerText = $("<p>");
                answerText.text(options[i]);
                answerText.addClass("answerOptions");
                answerText.attr("id", options[i]);

                questionScreen.append(answerText);
            }
        
            console.log(options);
            var questionElementChildren = questionScreen.children(); //returns an array with the children of the div 
            
            console.log(questionElementChildren);

            //apply the same click function to all children of the question screen div which are the answer <p> elements 
            questionScreen.children().on("click", function() {
                
                // this grabs the child element that was clicked and then .innerText allows us to 
                // grab the text value associated with the innerText key
                selectedAnswer = this.innerText; 

                clearInterval(interval); //clear the timer 

                $("#timerText").css("display", "none"); //hide the timer
                $("#questionScreen").css("display", "none"); //hide the question screen
                $("#answerScreen").css("display", "block"); //then we display the div with id answerScreen where we will show the user the correct answer
                
                var answerHeading = $("<h1>");

                //if the user's selected answer is equal to the actual answer 
                if(selectedAnswer === actualAnswer) {
                    answerHeading.text("You are correct!");
                    numCorrect++; //increment the total number correct by 1, we use this to display later 
                } else if (selectedAnswer !== actualAnswer) {
                    answerHeading.text("Nope! The correct answer is " + actualAnswer); //show user the correct answer 
                    numIncorrect++; //increment the total number incorrect by 1 
                }

                //create a new button that lets the user move on to the next question at their convenience
                //this will not show when the user runs out of time
                var nextButton = $("<button>");
                nextButton.text("Next Question");
                nextButton.on("click", function() {

                    resetScreen(); //used to reset the screen 

                });

                //append the next answer button to the div that is currently being shown
                $("#answerScreen").append(answerHeading);
                $("#answerScreen").append(nextButton);

            });
        } else if (currentQuestionIndex >= questionOptions.length){   // we are finished iterating throught the question array;

            $("#timer").empty(); //hide the timer 
            $("#questionScreen").css("display", "none"); //hide the question scree
            $("#answerScreen").css("display", "block"); //show the answer screen
            $("#question").empty();
            $("#answerScreen").empty();

            //create and append an <h1> tag that shows the user the amount of questions they got correct
            //and the amount of questions they got incorrect
            var results = $("<h1>"); 
            results.text("You got " + numCorrect + " correct and " + numIncorrect + " incorrect!");
            $("#answerScreen").append(results);

            var restartButton = $("<button>");
            restartButton.text("Restart");

            //when the restart button is pressed we begin a completely new game from the beginning 
            restartButton.on("click", function() {
                
                //reset all the stats
                currentQuestionIndex = 0; 
                selectedAnswer = ""; 
                actualAnswer = ""; 
                numCorrect = 0; 
                numIncorrect = 0; 

                //to avoid bugs and unwanted text, we clear out both question and answer divs 
                $("#questionScreen").empty(); 
                $("#answerScreen").empty();

                $("#questionScreen").css("display", "none");
                $("#answerScreen").css("display", "none");
                $("#startingScreen").css("display", "block");

            });

            $("#answerScreen").append(restartButton);

        }

    }

    //this function is called when the timer runs out
    //used to show text to notify the user they have ran out of time 
    //waits three seconds before moving onto the next question
    function timesUp() {
        numIncorrect++;
        $("#questionScreen").css("display", "none");
        $("#answerScreen").css("display", "block");
        var answerHeading = $("<h1>");
        answerHeading.text("you ran out of time!");
        $("#answerScreen").append(answerHeading);
        setTimeout(function(){
           resetScreen();
        }, 3000);
    }

    //a function used to reset the screen to prepare for the next question and start the game
    function resetScreen() {
        currentQuestionIndex++; //helps us iterate through the question index
        $("#questionScreen").empty();
        $("#answerScreen").empty();
        $("#questionScreen").css("display", "block");
        $("#answerScreen").css("display", "none");
        startGame();
    }

});

