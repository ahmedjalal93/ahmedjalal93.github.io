function generateMarkdown(data) {
  return `
# ${data.project}
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](${data.url})

## Description
 ${data.description}

# Table of Content
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)

## Installation
To install necessary dependencies, run the following command: 

${data.install}

## Usage
${data.about}

## License
This project is licensed under the MIT license

## Contributing
${data.contribution}

## Tests
To run tests, run the following command:

${data.test}

## Questions
if you have any questions contact ${data.username} at ${data.email}

`;
}

module.exports = generateMarkdown;
