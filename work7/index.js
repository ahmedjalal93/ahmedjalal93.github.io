var inquirer = require("inquirer");
var Data = require("./data");
var Generate = require("./utils/generateMarkdown");

const questions = [
    {
      type: 'input',
      name: 'username',
      message: "What's your GitHub username?",
      validate: function(value) {
        if (/[a-zA-Z1-9._]/gi.test(value)) {
          return true;
        }
        return 'Please enter a valid username';
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
        type: 'input',
        name: 'project',
        message: "What's your project name?",
        validate: function(value) {
            if (/[a-zA-Z0-9-.]+$/gi.test(value)) {
            return true;
            }
            return 'Please enter a valid project name';
        }
    },
    {
        type: 'input',
        name: 'url',
        message: "The Url to your project"
    },
    {
        type: 'input',
        name: 'description',
        message: "Please write a description of your project"
    },
    {
        type: 'input',
        name: 'license',
        message: "What kind of license should your project have?"
    },
    {
        type: 'input',
        name: 'install',
        message: "What command should be run to install dependencies?"
    },
    {
        type: 'input',
        name: 'test',
        message: "What command should be run to run the test?"
    },
    {
        type: 'input',
        name: 'about',
        message: "What does the user need to know about the repo?"
    },
    {
        type: 'input',
        name: 'contribution',
        message: "What does the user need to know about contributing to the repo?"
    },
  ];

function writeToFile(fileName, data) {


}

function init() {

}

init();

inquirer.prompt(questions).then(answers => {
    var data = new Data(answers);
    console.log(Generate(data));
});