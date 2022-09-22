const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send("image upload server running");
})
app.listen(port, () =>{
    console.log(`image upload server running port ${port}`);
} );