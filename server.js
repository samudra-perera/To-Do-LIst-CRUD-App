const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://ToDoList:1234567890@cluster0.m2ppucy.mongodb.net/?retryWrites=true&w=majority'

MongoClient.connect(connectionString, {
    useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to the Database')
        const db = client.db('to-do-list')
        const toDoList = db.collection('toDoList')

        app.use(bodyParser.urlencoded({ extended: true }))
        app.set('view engine', 'ejs')

        app.listen(3000, function() {
            console.log('listening on 3000')
        })

        app.get('/', (req,res) => {
            res.sendFile(__dirname + '/index.html')
        })

        //Inserting a task into the to-do-list
        app.post('/toDoList', (req, res) => {
            toDoList.insertOne(req.body)
            .then(result => {
                res.redirect('/')
            })
            .catch(err => console.error(err))
        })
    })
    .catch(err => console.error(err))
