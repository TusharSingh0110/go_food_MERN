// const express = require('express')
// const app = express()
// const port = 5000
// const mongoDB=require("./db")
// mongoDB();
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
const express = require('express');
const mongoDB = require('./db'); // Corrected path to the database file

const app = express();
const PORT = process.env.PORT || 5000;

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requesed-With, Content-Type, Accept"
    );
    next();
})
// Define a route handler for the root URL
app.get('/', (req, res) => {
    res.send('Hello, World! Lawde ke baal');
});

// Middleware to parse JSON bodies
app.use(express.json());

// Route for user creation
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));


// Start the MongoDB connection and then start the server
mongoDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch(error => {
    console.error('Error starting server:', error);
});


