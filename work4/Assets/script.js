var score = 0;
var questions = [
    "What's the capital of Cuba?", 
    "What's the capital of Belgium?", 
    "What's the capital of Iraq?",
    "What's the capital of UNITED ARAB EMIRATES?",
    "What's the capital of VIETNAM?",
    "What's the capital of SWITZERLAND?",
    "What's the capital of SOUTH KOREA?",
    "What's the capital of SENEGAL?",
    "What's the capital of RUSSIA?",
    "What's the capital of MOROCCO?"
];
var choices = [
    ["HAVANA", "VIENNA", "DHAKA", "MINSK"],
    ["SUCRE", "BRUSSELS", "SOFIA", "YAOUNDE"],
    ["OTTAWA", "GABORONE", "BAGHDAD", "KIEV"],
    ["CARACAS", "MONTEVIDEO", "LONDON", "ABU DHABI"],
    ["SANA'A", "HANOI", "TUNIS", "DODOMA"],
    ["PARAMARIBO", "STOCKHOLM", "DAMASCUS", "BERN"],
    ["SEOUL", "MOGADISHU", "LJUBLJANA", "BRATISLAVA"],
    ["LISBON", "DOHA", "DAKAR", "BUCHAREST"],
    ["KIGALI", "MOSCOW", "MUSCAT", "OSLO"],
    ["RABAT", "PODGORICA", "MONACO", "MAJURO"],
];
var answers = [0,1,2,3,1,3,0,2,1,0];

var timer = {
    time : 180,
    looper: null,
    start: function(){
        timer.looper = setInterval(function(){
            timer.time--;
            timer.refresh();
            if(timer.time <= 0){
                endQuiz();
                timer.stop();
            }
        }, 1000);
    },
    stop: function(){
        if(this.looper !== null){
            clearInterval(timer.looper);
        }
    },
    penalty: function(){
        timer.time -= 10;
        timer.refresh();
    },
    refresh: function(){
        $("#countDown").text(timer.time);
    }
}

$("#startQuit").click(function(){
    startQuiz(0);
    timer.start();
});

var dialogTimeOut = null;
function dialogBox(status){
    $(".dialog").css("opacity", 1);
    $(".dialog").removeClass("alert-danger");
    $(".dialog").removeClass("alert-success");
    $(".dialog").removeClass("alert-warning");
    if(status === true){
        $(".dialog").addClass("alert-success");
        $(".dialog").text("Right!")
    }else if(status === false){
        $(".dialog").addClass("alert-danger");
        $(".dialog").text("Wrong!");
    }else{
        $(".dialog").addClass("alert-warning");
        $(".dialog").text(status);
    }
    if(dialogTimeOut !== null){
        clearTimeout(dialogTimeOut);
    }
    dialogTimeOut = setTimeout(function(){
        $(".dialog").css("opacity", 0);
    }, 3000);
}

function startQuiz(index){
    $("#quiz").empty();
    $("#quiz").removeClass("text-center");
    $("#quiz").append("<h3>" + questions[index] + "</h3>");
    $.each(choices[index], function(index, value){
        $("#quiz").append("<button class='btn btn-outline-primary choice'>" + value + "</button><br/>");
    });
    $(".choice").on("click", function(){
        var answer = choices[index].indexOf($(this).text());
        console.log(answer);
        if(answer === answers[index]){
            score += 10;
            console.log("right");
            dialogBox(true);
        }else{
            console.log("wrong");
            timer.penalty();
            dialogBox(false);
        }
        if(index === (questions.length -1)){
            endQuiz();
        }else{
            index++;
            startQuiz(index);
        }
    });
}

function endQuiz(){
    $("#quiz").empty();
    $("#quiz").append("<h3><b>All done!<b/></h3><br/>");
    $("#quiz").append("<p><b>Your final score is : " + score + "/100</b></p>");
    $("#quiz").append("<label for='initials'>Enter you initials:&nbsp;&nbsp;</label>");
    $("#quiz").append("<input type='text' id='initials'/>&nbsp;&nbsp;");
    $("#quiz").append("<button id='save' class='btn btn-primary'>Save</button>");
    $("#save").click(function(event){
        event.preventDefault();
        if($("#initials").val() !== null && $("#initials").val() != ""){
            var data = [];
            if(localStorage.getItem("scores") !== null){
                data = JSON.parse(localStorage.getItem("scores"));
            }
            data.push([$("#initials").val(), score]);
            localStorage.setItem("scores", JSON.stringify(data));
            showScores();
        }else{
            dialogBox("Please enter your initials");
        }
    });
}

function clearScores(){
    window.localStorage.removeItem("scores");
    $("#list").empty();
}

function showScores(){
    timer.stop();
    $("#quiz").empty();
    $("#quiz").removeClass("text-center");
    $("#headers").hide();
    $("#quiz").append("<h3><b>All scores</b></h3>");
    var data = JSON.parse(localStorage.getItem("scores"));
    $("#quiz").append("<ul id='list'></ul>");
    $.each(data, function(index, value){
        $("#list").append("<li><b>" + value[0] + "</b> has a score of " + value[1]);
    });
    $("#quiz").append("<button id='clearBtn' onclick='clearScores();' class='btn btn-primary'>Clear scores</button>&nbsp;&nbsp;");
    $("#quiz").append("<button onclick='location.reload();' class='btn btn-secondary'>Re-take</button>");
    if(localStorage.getItem("scores") === null){
        $("#clearBtn").prop('disabled', true);
        $("#clearBtn").addClass('disabled');
    }
}