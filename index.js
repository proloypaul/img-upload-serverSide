const express = require('express');
const app = express();
const port = 3600;

app.get('/', (req, res) => {
    res.send("image upload server running");
})
app.listen(port, () =>{
    console.log(`image upload server running port ${port}`);
} );