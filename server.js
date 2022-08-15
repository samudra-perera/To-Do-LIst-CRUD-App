const express = require('express');
const bodyParser = require('body-parser');
const { response } = require('express');
const { json } = require('body-parser');
const app = express();
const PORT = 3000;
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://ToDoList:1234567890@cluster0.m2ppucy.mongodb.net/?retryWrites=true&w=majority';
require('dotenv').config()

let db

MongoClient.connect(connectionString, {
    useUnifiedTopology: true })
    .then(client => {
        db = client.db('to-do-list')
        console.log('Connected to the Database')
    })
    .catch(err => console.error(err))

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(express.json())
    app.use(express.static('public'))
    app.set('view engine', 'ejs')

    //Getting the tasks from MongoDB 
    app.get('/', (req, res) => {
        db.collection('toDoList').find().toArray()
        .then(results => {
            res.render('index.ejs', { toDoList: results })
        })
        .catch(err => console.error(err))
        
    })

    //Inserting a task into the to-do-list
    app.post('/toDoList', (req, res) => {
        db.collection('toDoList').insertOne({
            task: req.body.task,
            taskType: req.body.taskType,
            importance: req.body.importance,
        })
        .then(result => {
            res.redirect('/')
        })
        .catch(err => console.error(err))
    })

    //Deleting a task from MongoDB 
    app.delete('/deleteTask', (req, res) => {
        console.log([req, 'request'])
        db.collection('toDoList').deleteOne({task: req.body.taskNameS})
        .then(result => {
            console.log('Task got deleted')
            res.json('Task got Deleted')
        })
        .catch(err => console.error(err))
    })
    
    app.put('/addToCompleted', (req, res) => {
        db.collection('toDoList').updateOne({completed: req.body.completedS}, {
            $set: {
                completed: req.body.completedS + 1
            }
        })
        .then(result => {
            console.log('Add one task')
            res.json('Like')
        })
        .catch(err => confirm.error(err))
    })



    app.listen(process.env.PORT || PORT, ()=>{
        console.log(`Server running on port ${PORT}`)
    })