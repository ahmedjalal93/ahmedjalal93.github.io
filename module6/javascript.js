//dynamic programming used
var elements = document.querySelectorAll('#button1, #button2, #button3, #button4');
var mParent = document.getElementById("parent");
var mBox = document.getElementById("box");
var boxClone = mParent.cloneNode(true);

//can be done without a loop. loop added in case we need to do more for each case outside elements
for (var i=0, iLen=elements.length; i<iLen; i++) {

    switch(i){
        case 0:
            elements[i].addEventListener('click', function() {
                mBox.style.width = "250px";
                mBox.style.height = "250px";
            });
            break;
        case 1:
            elements[i].addEventListener('click', function() {
                mBox.style.background = "blue";
            });
            break;
        case 2:
            elements[i].addEventListener('click', function() {
                mBox.style.opacity = ".3"
                mBox.style.transition = "opacity 2s";
            });
            break;
        case 3:
        default:
            elements[i].addEventListener('click', function() {
                mParent.innerHTML = boxClone.innerHTML;
                mBox = document.getElementById("box");
            });
            break;

    }
}