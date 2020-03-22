# Approach

I started reading the requirements for the assignment.
I identified what needed to be coded.
I started making the confirm and prompt functions to interact with the client
The password input must be between 8-128 and must be a number and it cannot be null
Every Time the user fail to meet the requirement. They are asked to try again.


# Password Generator

```
I was trying to simplify my code to get the end result keeping in mind no less or more code written
I'm using the input number from the user (password length) for my loop
I have created a string for upper case, numbers and special.
The default password always have at least 8 lowercase chars
For each prompt message the user is asked whether to include something in their password, I'm making a boolean variable for their answer
For each boolean I'm looking to see if it's true or false. When it's true, I'm including the string chars for that boolean and vise versa.
I'm using charAt to get my chars from the final variable that has all the included chars with the help of Math.random()

```