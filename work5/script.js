$("#currentDay").text(moment().format('LLLL'));

var calender = {
    _this:this,
    workHours:[9,10,11,12,13,14,15,16,17],
    isAMPM:function(hour){
        if(hour > 12){
            hour = (hour - 12) + "PM";
            return hour;
        }else{
            hour = hour + "AM";
            return hour;
        }
    },
    currentHour: function(){
        return Number(moment().hour());
    }
}

function listHours(){
    var hours = calender.workHours;
    var now = calender.currentHour();
    var notes = [];
    if(localStorage.getItem("Notes") !== null){
        notes = JSON.parse(localStorage.getItem("Notes"));
    }else{
        for(hour in hours){
            notes.push([hours[hour], ""]);
        }
        console.log(notes);
    }
    
    for(hour in hours){
        var row = $("<div>");
        row.addClass("row justify-content-md-center");
        var timeBlock = $("<div>");
        var description = $("<textarea>");
        var saveBtn = $("<button>");
        timeBlock.addClass("time-block");
        description.addClass("description");
        saveBtn.addClass("saveBtn");
        timeBlock.text(calender.isAMPM(hours[hour]));
        saveBtn.text("Save");
        if(now > hours[hour]){
            description.addClass("past");
        }else if(now < hours[hour]){
            description.addClass("future");
        }else{
            description.addClass("present");
        }
        description.val(notes[hour][1]);
        row.append(timeBlock);
        row.append(description);
        row.append(saveBtn);
        $(".container").append(row);
    }

    $(".saveBtn").click(function(){
        var selectedTime = $(this).parents(".row").children(".time-block").text();
        var descriptionVal = $(this).parents(".row").children(".description").val();
        if(selectedTime.includes("PM")){
            selectedTime = Number(selectedTime.replace(/[^0-9.]/g, ""));
            selectedTime += 12;
        }else{
            selectedTime = Number(selectedTime.replace(/[^0-9.]/g, ""));
        }
        for(note in notes){
            if(notes[note][0] === selectedTime){
                notes[note][1] = descriptionVal;
            }
        }
        localStorage.setItem("Notes", JSON.stringify(notes));
    });
}
listHours();