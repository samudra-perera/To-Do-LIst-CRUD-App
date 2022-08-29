const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3000;
const app = express();
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://ToDoList:1234567890@cluster0.m2ppucy.mongodb.net/?retryWrites=true&w=majority';
require('dotenv').config()

let db

MongoClient.connect(process.env.DB_STRING, {
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
    app.get('/', async(req, res) => {
        try{
            const toDoList = await db.collection('toDoList').find().toArray()
            const tasksLeft = await db.collection('toDoList').countDocuments({completed: false})
            const taskCompleted = await db.collection('toDoList').countDocuments({completed: true})
            res.render('index.ejs', {toDoList: toDoList, tasksLeft: tasksLeft, taskCompleted: taskCompleted})
        } catch(err) {
            console.error(err)
        }
    })

    //Inserting a task into the to-do-list
    app.post('/toDoList', (req, res) => {
        db.collection('toDoList').insertOne({
            task: req.body.task,
            taskType: req.body.taskType,
            importance: req.body.importance,
            completed: false
        })
        .then(result => {
            res.redirect('/')
        })
        .catch(err => console.error(err))
    })

    //Deleting a task from MongoDB 
    app.delete('/deleteTask', (req, res) => {
        db.collection('toDoList').deleteOne({task: req.body.taskNameS})
        .then(result => {
            console.log('Task got deleted')
            res.json('Task got Deleted')
        })
        .catch(err => console.error(err))
    })
    
    //Updating a task --> Setting the Complete to true when the task is completed
    app.put('/addToCompleted', (req, res) => {
        db.collection('toDoList').updateOne({task: req.body.taskNameS}, {
            $set: {
                completed: true
            }
        })
        .then(result => {
            console.log('Add one task')
            res.json('Like')
        })
        .catch(err => confirm.error(err))
    })

    //Updating a task --> Setting the Complete to false when the task is uncompleted
    app.put('/addToUnComplete', (req, res) => {
        db.collection('toDoList').updateOne({task: req.body.taskNameS}, {
            $set: {
                completed: false
            }
        })
        .then(result => {
            console.log('UnAdd one task')
            res.json('Like')
        })
        .catch(err => confirm.error(err))
    })

    //Listening to the port where the server is running localling
    app.listen(process.env.PORT || PORT, ()=>{
        console.log(`Server running on port ${PORT}`)
    })