const express = require('express')
const morgan = require('morgan')
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const req = require('express/lib/request');
const ObjectId = require('mongodb').ObjectId
const path = require('path')


const PORT = process.env.PORT || 8080

const app = express()

app.set('view engine', 'ejs')
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname,'public')));

app.get('/home', (req, res) => {
    res.render('pages/index', {title : 'Hi'})
})


app.get('/', (req, res) => {
    // res.render('index', { title: 'e3learners' })
    res.sendFile(__dirname + '/index.html')
})


const uri = "mongodb+srv://aaaaaaaa:aaaaaaaa@cluster0.lj19d.mongodb.net/mydb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("mydb").collection("userData");
    app.get("/data", (req, res) => {
        collection.find({})
            .toArray((err, results) => {
                res.send(results)
            })
    })
    app.get(`/user/:id`, (req, res) => {
        collection.find({ _id: ObjectId(req.params.id) })
            .toArray((err, result) => {
                res.send(result[0])
            })
    })
    app.post("/userInfo", (req, res) => {
        const user = req.body
        collection.insertOne(user)
            .then(result => {
                console.log('data inseted')
                res.redirect('/')
               
            })
    })
    app.patch('/update/:id', (req, res) => {
        collection.updateOne({ _id: ObjectId(req.params.id) },
            {
                $set: { name: req.body.name, age: req.body.age },
            })
                .then(results => {
                    res.send(results.modifiedCount > 0)
                })
    })
    app.delete("/delete/:id", (req, res) => {
        collection.deleteOne({ _id: ObjectId(req.params.id) })
            .then(results => {
                res.send(results.deletedCount > 0)
            })
    })
    console.log('database connected');
});

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING IS PORT http://localhost:${PORT}`)
})
