// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');
// fs is a Node standard library package for reading and writing files
const fs = require('fs');

// TODO: Create an array of questions for user input
const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'Enter the title of your project. (Required)',
    validate: titleInput => {
      if (titleInput) {
        return true;
      } else {
        console.log('Enter the title of your title.');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'github',
    message: 'Enter your GitHub username. (Required)',
    validate: githubInput => {
      if (githubInput) {
        return true;
      } else {
        console.log('Enter your GitHub username.');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'repo',
    message: 'Provide the name of your repo. (Required)',
    validate: repoInput => {
      if (repoInput) {
        return true;
      } else {
        console.log('Provide the name of your repo.')
      }
    }
  },
  {
    type: 'input',
    name: 'description',
    message: 'Provide a description of your application. (Required)',
    validate: descInput => {
      if (descInput) {
        return true;
      } else {
        console.log('Please enter a description of your application.');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'usage',
    message: 'Provide information for using your application. (Required)',
    validate: usageInput => {
      if (usageInput) {
        return true;
      } else {
        console.log('Provide information for using your application.');
        return false;
      }
    }
  },
  // adding checkbox type for additional sections a user would like to add.
  {
    type: 'checkbox',
    name: 'contents',
    message: 'Are there any additional sections you would like to include in your README?',
    choices: [
      {
        name: 'Deployed Application',
        checked: false
      },
      {
        name: 'Installation',
        checked: true
      },
      {
        name: 'Usage',
        checked: true
      },
      {
        name: 'License',
        checked: false
      },
      {
        name: 'How to Contribute',
        checked: false
      },
      {
        name: 'Credits',
        checked: false
      },
    ]
  },
  {
    type: 'input',
    name: 'link',
    message: 'Provide a link to your deployed application.',
    when: ({ contents }) => {
      if (contents.indexOf('Deployed Application') > -1) {
        return true;
      } else {
        return false;
      }
    },
    validate: linkInput => {
      if (linkInput) {
        return true;
      } else {
        console.log('Provide a link to your deployed application.');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'installation',
    message: 'List any required packages for installation of your application.',
    when: ({ contents }) => {
      if (contents.indexOf('Installation') > -1) {
        return true;
      } else {
        return false;
      }
    },
    validate: installInput => {
      if (installInput) {
        return true;
      } else {
        console.log('Enter the installation instructions.');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'usage',
    message: 'Provide instructions and examples for use.',
    when: ({ contents }) => {
      if (contents.indexOf('Usage') > -1) {
        return true;
      } else {
        return false;
      }
    },
    validate: linkInput => {
      if (linkInput) {
        return true;
      } else {
        console.log('Provide instructions and examples for use. Include screenshots as needed.');
        return false;
      }
    }
  },
  {
    type: 'list',
    name: 'license',
    message: 'Please provide license information.',
    choices: ['MIT', 'GNU', 'Apache 2.0', 'ISC'],
    default: 0,
    when: ({ contents }) => {
      if (contents.indexOf('License') > -1) {
        return true;
      } else {
        return false;
      }
    },
    validate: licenseInput => {
      if (licenseInput) {
        return true;
      } else {
        console.log('Please provide license information.');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'contribute',
    message: 'Provide guidelines for contributing. (Required)',
    when: ({ confirmContributers }) => {
      if (confirmContributers) {
        return true;
      } else {
        return false;
      }
    },
    validate: contributerInput => {
      if (contributerInput) {
        return true;
      } else {
        console.log('Provide contributer guidelines.');
        return false;
      }
    }
  },
];

// Created an array of prompts for adding screenshots with the help of a friend
const screenshotQues = [
  {
    type: 'input',
    name: 'screenshotLink',
    message: 'Provide a link for your screenshot. (Required)',
    validate: screenshotLinkInput => {
      if (screenshotLinkInput) {
        return true;
      } else {
        console.log('Provide a link for your screenshot.')
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'screenshotAlt',
    message: 'Provide alt text for your screenshot. (Required)',
    validate: screenshotAltInput => {
      if (screenshotAltInput) {
        return true;
      } else {
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'screenshotDesc',
    message: 'Provide a description of your screenshot. (Optional)'
  },
  {
    type: 'confirm',
    name: 'confirmAddScreenshot',
    message: 'Would you like to add another screenshot?',
    default: false
  }
];

// Created an array of prompts for adding credits with the help of a friend
const creditQues = [
  {
    type: 'input',
    name: 'creditName',
    message: 'Please give your credit a name. (Required)',
    validate: creditName => {
      if (creditName) {
        return true;
      } else {
        console.log('Enter a name for the credit.');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'creditLink',
    message: 'Provide a link for the credit. (Required)',
    validate: creditLink => {
      if (creditLink) {
        return true;
      } else {
        console.log('Provide a name for the credit.');
        return false;
      }
    }
  },
  {
    type: 'confirm',
    name: 'confirmAddCredit',
    message: 'Would you like to add another credit?',
    default: false
  }
];

// TODO: Create a function to write README file
const writeFile = fileContent => {
  return new Promise((resolve, reject) => {
    fs.writeFile('./dist/generated-README.md', fileContent, err => {
      if (err) {
        reject(err);
        return;
      }

      resolve({
        ok: true,
        message: 'README file created.'
      });
    });
  });
};

// function to prompt questions and store user inputs
const init = () => {

  return inquirer.prompt(questions)
  .then(readmeData => {
      return readmeData;
  })
};

// TODO: Create a function to initialize app
init()
.then(readmeData => {
  console.log(readmeData);
  return generateMarkdown(readmeData);
})
.then(pageMD => {
  return writeFile(pageMD);
})
.then(writeFileResponse => {
  console.log(writeFileResponse.message);
})
.catch(err => {
  console.log(err);
});
