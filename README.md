![](https://www.coindesk.com/wp-content/themes/coindesk2/images/events/consensus-2015/sponsors-and-partners/general-assembly.png)

# GA WDI30 Project 2: 'iToons'

## Introduction

In week 5 of the course, I developed a fansite for cartoons, written with an EJS frontend and a Node / Express backend. I implemented user registration and login using `express-session`. I experimented for the first time with uploading image files for the user’s avatar during this project (a topic we learnt in class a few weeks later).

## Concept

The challenge was to build my first fully RESTful Express app. I wanted to build the site around a theme that was fun and one that I knew I would really enjoy: that theme started out as the cartoons that I watched as a child growing up in the 80s. After building the core functionality, I pivoted very slightly: seeing the cartoon fansite in the flesh made me realise that the USP of the site wasn't 80s cartoons but cartoons in general.

## Technologies

* JavaScript (ES6)
* MongoDB
* Node / Express
* SCSS
* Embedded JavaScript (EJS)
* Materialize-CSS frontend framework

## Dependencies

* `bcrypt` for hashing passwords
* `bluebird` promise library for usage with `mongoose`
* `body-parser` for parsing POST requests to the Express server from views
* `browser-sync` for hot browser reload when changes are made to the code
* `ejs` for rendering views with content fetched from the Express backend
* `express` the actual server backend
* `express-ejs-layouts` for building view templates
* `express-fileupload` for the purpose of uploading avatar images
* `express-flash` for implementing flash messages e.g. "Welcome back Rupesh!" on successful login
* `express-session` for implementing the authentication system
* `method-override` allowing the usage of HTTP verbs such as PUT or DELETE when the browser doesn't support them (more info [here](https://github.com/expressjs/method-override))
* `mongoose` the ORM for making retrieving data from the Mongo database
* `morgan` for more verbose server-side logging


## Screenshots

![screenshot1.png](/screenshots/screenshot1.png)

![screenshot2.png](/screenshots/screenshot2.png)

![screenshot3.png](/screenshots/screenshot3.png)

![screenshot4.png](/screenshots/screenshot4.png)

## Heroku Link
[https://itoons.herokuapp.com/](https://itoons.herokuapp.com/)

## What went well

I really enjoyed using Materialize for this project. As an Android user, I quite like Google material design so it was nice to use google-style web-components through the Materialize-CSS frontend framework. I think the finished product looks visually appealing for the user and the basic color palette is playful and fun: important for a cartoon fansite! I was also proud that the site worked nicely on different sized devices too in terms of the responsive user experience.

## Feature backlog

I would implement the following features next:

1. **Message timestamps** It would be nice to implement timestamps alongside individual comments
2. **Youtube links** Link to video content on Youtube
3. **Notifications** Notify the user when a new comment has been received on a thread they themselves have commented on (think early-Facebook!)
4. **Admin user** Admin user that can moderate all content (although the plan was for self-moderated content i.e. the owner of a cartoon board would be responsible for moderating the content)

## Final thoughts

I had a lot of fun designing and building this site! I feel I understood the backend better following the delivery of this project and really saw the value of being able to use Javascript on both the frontend and the backend - which, until recently, couldn't be done!
