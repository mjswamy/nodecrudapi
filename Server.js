// Importing expressjs

//express js for creating server and api to get,post,put and delete

const express = require('express')


//body Parser for getting the data through the urls

const bodyParser = require('body-parser')


//Importing Mongo Client

const MongoClient = require('mongodb').MongoClient
const res = require('express/lib/response')


//const app controls the entire app with express finctional constructor

//server and api's

const app = express()

// setting ejs template engine
app.set('view engine','ejs')

//wee are saying express.js that to use body parser url encoded to be true

app.use(bodyParser.urlencoded({ extended: true }))



//Db connection String

const connectionString = "mongodb+srv://swamy:upendra@cluster0.43dqf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"



//connecting the db

MongoClient.connect(connectionString, { useUnifiedTopology: true })

    .then(client => {

        console.log('connected to database-server')

        const db = client.db('star-war-quotes')

        const quotesCollection = db.collection('quotes')



        //create route with creating the quote

        app.post('/quotes', (req, res) => {

            quotesCollection.insertOne(req.body)

                .then(result => {

                    res.send(result)

                })

                .catch(error => console.error(error))

        })
        // 2. Reading data from MongoDB
        app.get('/getall', (req, res) => {
            //Finding the collection quotes and changing object of object to array of objects
            db.collection('quotes').find().toArray()
                //waiting for the promise to send us the result back
                .then(result => {
                    res.render('index.ejs',{quotes:result})
                })
                // Waiting for the promise to send us the error back
                .catch(error => console.error(error))
        })
        //3. Updating data from MongoDB
        app.put('/updatequote', (req, res) => {
            quotesCollection.findOneAndUpdate()
        // waiting for the promise to send us the result back    
                .then(result => {
                    res.send(result)
                })
        // waiting for the promise to send us the error back        
                .catch(error => console.error(error))
        })





    }).catch(console.error)  // MongoDB Atlas Cluster/Server Connection Error

 


app.get('/', (req, res) => {

    res.sendFile(__dirname +'/index.html')

})



const PORT = 5000



app.listen(PORT, () => {

    console.log(`server running at port ${PORT}`)

})