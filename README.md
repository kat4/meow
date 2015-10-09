# meow
[![Code Climate](https://codeclimate.com/github/kat4/meow/badges/gpa.svg)](https://codeclimate.com/github/kat4/meow)
[![Test Coverage](https://codeclimate.com/github/kat4/meow/badges/coverage.svg)](https://codeclimate.com/github/kat4/meow/coverage)
[![Codecrystal](https://img.shields.io/badge/code-crystal-5CB3FF.svg)](http://codecrystal.herokuapp.com/crystalise/kat4/meow/master)

An app for people to share opinions in just 140 characters. To view our Heroku hosted app [https://meow-kat.herokuapp.com/](https://meow-kat.herokuapp.com/)

Our opening plan, in which we detailed the functionality and functions needed to meet the requirements. 
![readme white board outline](https://files.gitter.im/kat4/fac6d1/k5pM/thumb/IMG_20151009_101637.jpg "readme")

##Basic Requirements
- [X] Create, Read and Delete functionality for posts. Removing from front-end site and back-end database.
      [X]Create
      [X]Read
      []Delete
- [X] Use Redis on the back-end for the database.
- [] Use cookies so only the poster can delete their tweets.
- [X] Real-time Updates of tweets.
- [X] Testing & 80% code coverage.

##Who we are
- A team of trainee developers at Founders & Coders. This our week 4 project. To see our other projects go to our [repo](https://github.com/kat4) and have a look at [wordkat](https://github.com/kat4/wordkat) and [instaground](https://github.com/kat4/instaground).
- We are Kata, Katerina, Josh and Matt.

##Run locally

- Make sure you have Node.js installed.
- Clone repo from git@github.com:kat4/meow.git
- Run npm install to install the dependencies
- In one terminal window start the server with node server.js or nodemon server.js if you have nodemon installed
- In another open redis with the command redis-server. You can check it's working by typing: redis-cli ping.
- Access site on localhost:8000

To see our file structure crystal click on the codecrystal badge at the top of our repo or here> [kat4 crystal](http://codecrystal.herokuapp.com/crystalise/kat4/meow/master)

