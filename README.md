# WeAgenda

![Test and Build Android & iOS](https://github.com/wepala/weagenda/workflows/Test%20and%20Build%20Android%20&%20iOS/badge.svg)

WeAgenda is a task management application

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

1. Node
1. NPM
1. Android SDK (if compiling Android App)
1. XCode (if compiling iOS app)

Mac
1. You can use homebrew to install Node
```
brew install nodejs
```

### Installing

Clone the repository

```
Give the example
```

Install the dependencies

```
npm install
```

## Running the tests

To run all the tests

```
npm test
```

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Deployments are done through Github actions. They are automatically triggered for Android and iOS when a pull request is made for a **release branch**. They are also triggered when new commits are pushed to a release branch.

For Android releases, we need the following information setup:

* ANDROID_KEYSTORE \- Base64 encoded key store
* ANDROID_KEYSTORE_PASSWORD \- Password for the key store
* ANDROID_KEY_ALIAS \- Alias/name of the key
* ANDROID_KEY_PASSWORD \- Password for the key

For iOS, we currently need a developer team added to the project to create an IPA.

## Built With

* [React Native](https://reactnative.dev/)
* [Flow](https://flow.org/) - Dependency Management

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/wepala/weagenda/tags).

## Authors

* **Akeem Philbert** - *Initial work* - [Akeem Philbert](https://github.com/AkeemPhilbert)

See also the list of [contributors](https://github.com/wepala/weagenda/contributors) who participated in this project.

## License

This project is licensed under the AGPL License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
