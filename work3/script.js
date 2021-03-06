// Assignment Code
var generateBtn = document.querySelector("#generate");
var chars, upperCase, numbers, special, passUpperCase = true, passNumbers = true, passSpecial = true, ret = "";

// Write password to the #password input
function writePassword() {
  passwordFormat();
  generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = ret ;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function passwordFormat(){
  passwordLength();
  includeUpperCase();
  includeNumbers();
  includeSpecial();
}

//getting the password length from user 
function passwordLength(){
  chars = prompt("How many characters in the password? (8-128 range)");
  //if input in not provided ask again
  if(chars !== null && chars !== ""){
    chars = Number(chars.trim());
    // if the input is not a number try again
    if(typeof chars === 'number' && !isNaN(chars)){
      //if the input is not in range try again
      if(chars < 8 || chars > 128){
        alert("Your password length is not acceptable. Passowrd range between 8-128");
        passwordLength();
      }
    }else{
      alert("Numbers only");
      passwordLength();
    }
  }else{
    alert("You must enter a password length. Range 8-128");
    passwordLength();
  }
}

//function to ask the use to include upper case in the password
function includeUpperCase(){
  upperCase = confirm("Do you want to include upper case chars?");
}

// Function to ask the user to include numbers in the password
function includeNumbers(){
  numbers = confirm("Do you want to include numbers?");
}

// Function to ask the user to include special chars in the password
function includeSpecial(){
  special = confirm("Do you want to include special chars?");
}

//get a random number beween to number
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//generate a password for user
function generatePassword(){
  ret = "";
  var allChars = "abcdefghijklmnopqrstuvwxyz";
  var charsUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var charNumbers = "1234567890";
  var charSpecial = "!@#$%^&*()_+-':;<>={}[]\/.?~";
  if(upperCase){
    allChars += charsUpper;
    passUpperCase = false;
  }
  if(numbers){
    allChars += charNumbers;
    passNumbers = false;
  }
  if(special){
    allChars += charSpecial;  
    passSpecial = false;
  }
  //finding chars from included chars
  for(var i=0; i < chars; i++){
    var randomNumber = getRandom(0,(allChars.length -1));
    var currentChar = allChars.charAt(randomNumber);
    if(upperCase && !passUpperCase){
      if(charsUpper.indexOf(currentChar) >= 0){
        passUpperCase = true;
      }
    }
    if(numbers && !passNumbers){
      if(charNumbers.indexOf(currentChar) >= 0){
        passNumbers = true;
      }
    }
    if(special && !passSpecial){
      if(charSpecial.indexOf(currentChar) >= 0){
        passSpecial = true;
      }
    }


    ret += allChars.charAt(randomNumber);
  }
  if(!passUpperCase || !passNumbers || !passSpecial){
    generatePassword();
  }
}

