const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var employee = [];

const info = [
    {
      type: 'input',
      name: 'name',
      message: "What's your name?",
      validate: function(value) {
        if (/[a-zA-Z1-9]/gi.test(value)) {
          return true;
        }
        return 'Please enter a valid name';
      }
    },
    {
      type: 'input',
      name: 'id',
      message: "What's your employee ID?",
      validate: function(value) {
          if (/[0-9]+$/.test(value)) {
            return true;
          }
          return 'Please enter a valid ID';
      }
    },
    {
      type: 'input',
      name: 'email',
      message: "What's your email?",
      validate: function(value) {
          if (/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/gi.test(value)) {
            return true;
          }
          return 'Please enter a valid email';
      }
    },
    {
      type: "list",
      name: "roleChoice",
      message: "What is your role?",
      choices: ["Manager", "Engineer", "Intern"]
    },
    {
      "type": "input",
      "name": "role",
      "message": "What's your office number?",
      "when": (answers) => answers.roleChoice === "Manager"
    },
    {
      "type": "input",
      "name": "role",
      "message": "What's your github account?",
      "when": (answers) => answers.roleChoice === "Engineer"
    },
    {
      "type": "input",
      "name": "role",
      "message": "What's your school name?",
      "when": (answers) => answers.roleChoice === "Intern"
    },
    {
      type: 'confirm',
      name: 'continue',
      message: 'You want to add more(just hit enter for YES)?',
      default: true
    }
  ];


  function init(){
    inquirer.prompt(info).then(answers => {
      if(answers.roleChoice === "Manager"){
        employee.push(new Manager(answers.name, answers.id, answers.email, answers.role));
      }else if(answers.roleChoice === "Engineer"){
        employee.push(new Engineer(answers.name, answers.id, answers.email, answers.role));
      }else{
        employee.push(new Intern(answers.name, answers.id, answers.email, answers.role));
      }

      if(answers.continue){
        init();
      }else{
        saveHTML();
      }
    });
    
  }

  function saveHTML(){
    if(!fs.existsSync(OUTPUT_DIR)){
      fs.mkdir(OUTPUT_DIR, (err) => { 
        if (err) { 
            return console.error(err); 
        }
        console.log('Directory created successfully!'); 
        fs.writeFile(outputPath, render(employee), function (err) {
          if (err) return console.log(err);
        });
      }); 
    }else{
      fs.writeFile(outputPath, render(employee), function (err) {
        if (err) return console.log(err);
        console.log("Successfully generated " + outputPath);
      });
    }
  }

  init();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
