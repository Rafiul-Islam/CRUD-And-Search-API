const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const Users = require('./Model/users')
const dbURL = 'mongodb+srv://<username>:<password>@cluster0.hy7dn.mongodb.net/<dbname>?retryWrites=true&w=majority'

mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('db connected')
    })

app.get('/users', (request, response) => {
    Users.find()
        // .select('name')
        .then((data) => {
            response.status(201).json(data)
        })
})

app.get('/user/:id', jsonParser, (request, response) => {
    Users.findById({_id: request.params.id})
        .then((data) => {
            response.status(201).json(data)
        })
})

app.get('/search/:name', jsonParser, (request, response) => {
    const regex = new RegExp(request.params.name, 'i')

    Users.find({name: regex})
        .then((result) => {
            response.status(200).json(result)
        })
})

app.post('/user', jsonParser, (request, response) => {

    const data = new Users({
        _id: new mongoose.Types.ObjectId(),
        name: request.body.name,
        city: request.body.city,
        age: request.body.age
    })

    data.save()
        .then((result) => {
            response.status(201).json(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

app.delete('/user/:id', (request, response) => {
    Users.deleteOne({_id: request.params.id})
        .then((result) => {
            response.status(200).json(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

app.put('/user/:id', jsonParser, (request, response) => {

    Users.updateOne({_id: request.params.id}, {
        $set: {
            name: request.body.name,
            city: request.body.city,
            age: request.body.age
        }
    })
        .then((result) => {
            response.status(200).json(result)
        })

})

app.listen(5050)
