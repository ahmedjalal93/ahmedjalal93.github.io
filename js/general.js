window.addEventListener("scroll", function () {
    //i hate ie
    var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    if (top <= 49) {
        header.className = "header";
		logo.className = "logo";
		header.style.position= "relative";
    }else {
        if(infobar.style.display !== "block"){
            header.className = "header small";
		    logo.className = "logo small";
        }
		header.style.position= "fixed";
    }
});

window.addEventListener("load", function () {
    var header = document.getElementById("header");
    var logo = document.getElementById("logo");
    var infobar = document.getElementById("infobar");
    logo.onclick = function () {
        if (infobar.style.display !== "block") {
            infobar.style.display = "block";
			header.className = "header";
			logo.className = "logo";
        }else{
            infobar.style.display = "none";
		}
    }
});