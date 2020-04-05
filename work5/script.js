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
        return this.isAMPM(moment().hour())
    }
}
console.log(calender.currentHour());

