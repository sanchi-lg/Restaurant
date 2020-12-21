const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const MONGODB_URL = process.env.MONGODB_URL
const PORT = process.env.PORT || 9000
var fs = require('fs')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

if (process.env.NODE_ENV == "production") {
    app.use(express.static(__dirname + '/front/build'))
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname + '/front/build/index.html'))


    })
}


app.listen(PORT, () => {
    console.log(`working on ${PORT}`)

})
app.get("/getitems", (req, res) => {
    let v = req.params.v

    MongoClient.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, client) {
        const db = client.db('ital')
        var ob = []
        await db.collection('product').find({}).forEach(function (doc) {
            ob.push(doc.item)

        })

        res.json(ob);

    })
})

MongoClient.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, client) {
    const db = client.db('ital')
    var ob = []



})

app.get("/getitemrate/:v", (req, res) => {
    let v = req.params.v

    MongoClient.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, client) {
        const db = client.db('ital')
        var ob = []
        db.collection('product').findOne({ item: v }, (err, data) => {
            res.json(data.rate)
        })


    })
})

app.post("/login", (req, res) => {


    MongoClient.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, client) {
        const db = client.db('ital')
        var ob = []
        db.collection('employee').findOne({ "loginid": req.body.loginid, "password": req.body.password }, (err, data) => {



            if (err) {
                res.json({ "err": 1, "mssg": "something went wrong" })

            }
            else if (data == null) {
                res.json({ "err": 1, "mssg": "loginid or password not correct" })

            }
            else {
                res.json({ "err": 0, "mssg": "", "uid": { name: data.name, loginid: req.body.loginid } })


            }
        }
        )
    })
})


app.post("/addorder/:id", async (req, res) => {
    let id = req.params.id
    let item = req.body.item
    let quantity = req.body.quantity
    let total = req.body.total


    MongoClient.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, client) {
        const db = client.db('ital')
        var ob = []
        db.collection('employee').updateOne({ "loginid": id }, { $push: { products: { item: item, quantity: quantity, total: total, date: ((new Date()).getDate() + "-" + (new Date()).getMonth() + "-" + (new Date()).getFullYear()) } } }, (err, data) => {
          
            if (err || data.nModified == 0) {
                res.json({ err: 1, mssg: "something went wrong" })
            }
            else {
                res.json({ err: 0, mssg: "order is placed successfully" })
            }
        }
        )


    })
})


    app.get("/orders/:id", (req, res) => {

        let id = req.params.id

        MongoClient.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, async function (err, client) {
            const db = client.db('ital')
            var ob = []
            db.collection('employee').findOne({ "loginid": id }, (err, data) => {
                res.json(data.products)
                
            })


        })

       
