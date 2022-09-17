# To Do List / Task Manager
A simple to do list application where user can add (create), complete (update), and remove tasks (remove) and have them rendered on a simple UI (read).

**Link to project:** http://recruiters-love-seeing-live-demos.com/

![alt tag](http://placecorgi.com/1200/650)

## Installation
Prior to running this project on your machine please do the following. 
```
npm install 
```
And add your DB to the .env file like below.
```
DB_STRING = 'insert your mongodb string'
```
To run the application, in your terminal use the following command and go to localhost with the selected port (default to port 2121). 
```
node server
```

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Embedded JavaScript(EJS), NodeJS, ExpressJS, and MongoDB

**Client Side**

The front end of this application is being rendered by the templating language EJS. The EJS is rendered using the database information as inputs. A for loop is used to iterate through the database response and render the tasks as list items. 

**Server Side**

The server-side was built using NodeJS and expressJS to handle the HTTP requests and the routing. The database that was used was MongoDB a non-relational database.  

## Further Optimizations

Since this was a fairly simple project, I don't think there was much need for further optimizations outside of other package that could make quality of life better (ie mongoose, nodemon)

## Future Consideration

Some additional things I would have liked to add were: 

1. Using a MVC software architecture to seperate the views, database, and controllers. Since this application is fairly simple in its function it was not as large of a concern to seperate these. 

## Lessons Learned:
Learned how to set up a simple CRUD applicaton with a database. Learned about non-relational document databases (mongoDB) and how to query collections. Finally, understood how the client side and serve side talk to eachother in order to update and render pages for users. 

## Recent Projects:
Take a look at some of my other portfolio projects:

**Just Journal:** https://github.com/samudra-perera/Journal-App-Full-Stack

**The Recipe Book** https://github.com/samudra-perera/The-Recipe-Book

**Portfolio Site** https://github.com/samudra-perera/React-Portfolio-Site/tree/main/portfolio-site
