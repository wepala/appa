# WeAgenda

![Test and Build Android & iOS](https://github.com/wepala/weagenda/workflows/Test%20and%20Build%20Android%20&%20iOS/badge.svg)

WeAgenda is a simple customizable time tracking application that helps you manage your daily tasks in order to Increase  productivity through planning, scheduling and time tracking.

# Powered By WEOS
Find out more at [weos](https://wepala.com)

# Whats New!
  - You can now request help from the Wepala team to customise the app for your own personal needs
  - You can now get more info about the app/weos within the Weagenda about page

# Development

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

1. [Node](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions-enterprise-linux-fedora-and-snap-packages)
   - Mac
     - Use [Homebrew](https://brew.sh) to install Node
     ```brew install nodejs```
   - Windows 
     - Download the [Windows Installer](https://nodejs.org/en/#home-downloadhead) directly from the [nodejs](nodejs.org) web site.

2. [NPM](https://www.npmjs.com/get-npm)
3. [Android SDK (if compiling Android App)](https://developer.android.com/studio)
4. [XCode (if compiling iOS app)](https://developer.apple.com/xcode/)


### Installing

- Clone the repository to your local. 
  ```
  git clone https://github.com/wepala/weagenda.git
  ```
- Install the dependencies
  ```
  npm install
  ```

Before running the project, you will first need to set up some environment variables.
Create a new file in the `root` of the project called `.env`
Copy the contents of the [.env-dist](.env-dist) file into the `.env` and fill out the blanks

  - Your .env should resemble this:

  ``` 
      SUPPORT_URL = https://XXXXXXXXXXXXXX
      SENDER = XXXXXXXX@XXXXX
      DESTINATION = XXXXXXXX@XXXXX
      PIPELINE_URL=https://XXXXXXXXXXXXXX

  ```
These .env can be set as [secrets](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets) for your github workflow 

for an indepth look at each environment variable check out our [environment Guide](ENV.md)
 
## Running the tests

- To run all the tests
  ```
    npm test
  ```
for an indepth look at these tests check out our [Testing Guide](TEST.md)

## Deployment

Deployments are done through Github actions. They are automatically triggered for Android and iOS when a pull request is made for a **release branch**. They are also triggered when new commits are pushed to a release branch.

For Android releases, we need the following information setup:

- ANDROID_KEYSTORE \- Base64 encoded key store
- ANDROID_KEYSTORE_PASSWORD \- Password for the key store
- ANDROID_KEY_ALIAS \- Alias/name of the key
- ANDROID_KEY_PASSWORD \- Password for the key

For iOS, we currently need a developer team added to the project to create an IPA.

## Built With

- [React Native](https://reactnative.dev/)
- [Flow](https://flow.org/) - Dependency Management

## Contributing

Please read our [Contribution guidelines for this project](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/wepala/weagenda/tags).

## Linting 

We use [eslint](https://eslint.org) for parsing our ECMAScript/JavaScript code, in order to make our code more consistent and prevent bugs. 

## License

This project is licensed under the AGPL License - see the [LICENSE.md](LICENSE.md) file for details

## Authors

- **Akeem Philbert** - _Initial work_ - [Akeem Philbert](https://github.com/AkeemPhilbert)

See also the list of [contributors](https://github.com/wepala/weagenda/contributors) who participated in this project.

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
