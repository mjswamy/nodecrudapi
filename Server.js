// Importing expressJS

const express = require('express')

const app = express()



// Inbuilt function of express server

app.get('/',(req,res) =>{

    res.send('Hello World!')



})



const PORT = 3000



app.listen(PORT,() =>{

    console.log(`server running at port ${PORT}`)

})