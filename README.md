# DizplaiPoll

● It needs to have a readme on how to run it, and explain anything you did not have
time to finish, or any assumptions that were made.

How to run it -
Require 4 dependencies to run the app - Nodemon (as a dev tool), Express, EJS, Percent-Round.

Write this in the scripts "devStart": "nodemon server.js"

To start the application "npm run devStart" in terminal

Navigate to http://localhost:3000/

How to test it - 
Require 3 dependencies to test the app - cross-env, jest, supertest

Write this in the scripts "cross-env NODE_ENV=test jest --testTimeout=5000"

To start the application "npm run test" in terminal


Did not finish -
An identifier so that people could only vote on a Poll once such as sign up and login conditions

Original idea was to use a MongoDB and extract the contents however that was scrapped for a json file

Assumptions -
We assume that the EU would know how to search for a Poll, changing the url



● The technical test only needs to run locally, but think about how this could be hosted
somewhere.

It could be hosted as its own domain or through services such as heroku



● Show how you have tested both the frontend and backend to ensure it does not
break. What methods or tools did you use?

Nodemon for front end testing. Dynamically updates the server when code is changed so you can see the visual changes that are made

Jest for back end testing. Write testing scripts to determine the different functionalities of the code



● We would not be able to deploy this from a security perspective. What are the
potential security problems? And, how could they be solved?

The EU can change submit data using Inspect Element, this would be an Injection Attack vulnerability. To fix this the Submit data could be limited to the options from the Poll, this would be checked before sending to server.



● We suggest a node.js express server for the api. However, use any technology that
you think is best. Write down why you have chosen your selected technologies.

We used HTML, CSS, JavaScript, Node.js and express.js

HTML, CSS, JavaScript are corner stones of web development.

I had no experience in back end frameworks or API calls using express, therefore i used the guided technologies. I did research and from my knowledge it did seem these technologies were ideal based on system requirements



● post a vote of what option the user selected. This will need to be stored locally for the next action. This could be stored in memory, but how could we do something more permanent?

Have the post request update a database rather than change the json values. To keep in with json type formatting could use MongoDB



● It must handle error scenarios gracefully. For example, what happens if you try and
vote on a Poll that doesn’t exist?

Voting on a poll that does not exist will move the user to a results tab showing no results and the boilerplate text stating that it could not find the results