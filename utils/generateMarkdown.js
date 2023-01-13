// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
// Referencing the badge licenses from https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba
function renderLicenseBadge(license) {
  if (license !== 'no license') {
    return `
  ![badge](https://img.shields.io/badge/license-${license}-blue)
    `;
  } else {
    return ' ';
  }
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  if (license !== 'no license') {
    return `
  [${license}](https://choosealicense.com/licenses/${license})
    `;
  } else {
    return ' ';
  }
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  if (license !== 'no license') {
    return `
  ## [License](#table-of-contents)
  The application is covered under the following license:
  ${renderLicenseLink(license)}
    `;
  } else {
    return ' ';
  }
}

// Added a function that returns license in table of contents
// If there is no license it should return an empty string
 function renderLicenseTOC(license) {
  if (license !== 'no license') {
  return `
  * [License](#license)
    `;
  } else {
    return ' ';
  }
 }

 // Forgot to add function that return a message if user doesn't want contributors
function renderContributingSection(confirmContributers, data) {
  if (!confirmContributers) {
    return `
  Thank you for your interest! But, I will not be accepting contributions from third parties at the moment!
    `;
  } else {
    return `
  ${data}
    `;
  }
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  return `
  # ${data.title}
  
  ${renderLicenseBadge(data.license)}

  ## Table-of-Contents

  * [Description](#description)
  * [Installation](#installation)
  * [Usage](#usage)
  ${renderLicenseTOC(data.license)}
  * [Contributing](#contributing)
  
  ## [Description](#table-of-contents)
  ${data.what}
  ${data.why}
  ${data.how}

  To add a screenshot, create an assets/images folder in your repository and upload your screenshot to it. 
  Then, using the relative filepath, add it to your README.
  ![alt text](assets/images/screenshot.png)

  ## [Installation](#table-of-contents)
  ${data.installation}

  ## [Usage](#table-of-contents)
  ${data.usage}
  
  ${renderLicenseSection(data.license)}

  ## [Contributing](#table-of-contents)
  
  ${renderContributingSection(data.confirmContributers, data.contribute)}
`;
}

module.exports = generateMarkdown;
