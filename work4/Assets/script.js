var questions = ["What's the capital of Cuba?", "What's the capital of Belgium?", "What's the capital of Iraq?"];
var choices = [
    ["HAVANA", "VIENNA", "DHAKA", "MINSK"],
    ["SUCRE", "BRUSSELS", "SOFIA", "YAOUNDE"],
    ["OTTAWA", "GABORONE", "BAGHDAD", "KIEV"],  
];
var answers = [0,1,2];

var timer = {
    time : 180,
    looper: null,
    start: function(){
        timer.looper = setInterval(function(){
            timer.time--;
            timer.refresh();
        }, 1000);
    },
    stop: function(){
        clearInterval(timer.looper);
    },
    penalty: function(){
        timer.time -= 10;
        timer.refresh();
    },
    refresh: function(){
        $("#countDown").text(timer.time);
    }
}

function startQuiz(){
    timer.start();
    var rand = Math.floor(Math.random() * questions.length);
    $("#quiz").empty(rand);
    $("#quiz").append("<h3>" + questions[rand] + "</h3>");
    $.each(choices[rand], function(index, value){
        $("#quiz").append("<button class='btn btn-outline-primary choice'>" + value + "</button><br/>");
    });

    $(".choice").on("click", function(){
        var answer = choices[rand].indexOf($(this).text());
        console.log(answer);
        if(answer === answers[rand]){
            console.log("right");
        }else{
            console.log("wrong");
            timer.penalty();
        }
    });
}

function endQuiz(){
    
}
startQuiz();