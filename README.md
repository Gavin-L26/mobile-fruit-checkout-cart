# assignment1_pair-4-elenawzy-gavin-l26-mobile
The Mobile section of Assignment 1

Please Check the deployed app on Expo using the following link:
https://expo.io/@gavn00/my-app

Contains a frontend folder containing App.js (React-Native), and the server named index.js (Node.js).

CI made with github actions (.github/workflows folder) --> CI process can be seen in "Actions" tab --> npm test included in CI

CD implemented with Expo and Heroku (Heroku automatically deploys the application when there is a push) --> CD process can be seen in "environments" tab and then the deployments (If you click a certain deployment you can view the Heroku build scripts)

For testing, run "npm test" in the terminal in the root directory --> this uses Mocha and Chai unit-testing and will automatically search for the test folder in the root directory.
The unit test files can be found in the folder "test" in the root directory (test/appTest.js), if adding unit tests are needed.

The development environment:
The backend can be run with "node index.js" on localhost:5000. (execute this in root directory in your terminal)
The frontend can be run with command "expo start" and uses a iPhone or Android phone to scan the QR code, run on web, or iOS or Android Simulator. 

The production environment:
The app's frontend is deployed on Expo while the backend is deplopyed on Heroku. 
