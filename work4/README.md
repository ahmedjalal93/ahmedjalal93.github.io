# 04 Web APIs: Code Quiz

This quiz will be about World Geography.
You will be asked to answer 10 questions within 3 minutes.
Every time you answer a question, you will get a response whether your answer was right or wrong 
When you answer the the question correclty, You will earn 10 points.
When you give a wrong answer, you will lose 10 seconds.


# Approach
I'm making 3 arrays; one array for questions; one array for answers; and one multidimentional array for the multiple choices
I'm using the index to pair all the pieces of those three arrays.
When the array index of the choices equals the value inside the answers array with the index of questions are the same, Then that's a right answer
I'm making a setTimeout to clear my toast message presented to the user when answer every question
At the end of the test. Im using JSON to save and retrieve saved data from localStorage.
 

