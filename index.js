const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());


const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-shard-00-00.e3dsx.mongodb.net:27017,cluster0-shard-00-01.e3dsx.mongodb.net:27017,cluster0-shard-00-02.e3dsx.mongodb.net:27017/?ssl=true&replicaSet=atlas-cjr3cu-shard-0&authSource=admin&retryWrites=true&w=majority`;
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.e3dsx.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// console.log(uri);
async function run(){
    try{
        const database = client.db('ImgUploaderWeb');
        const usersCollection = database.collection('users');

        // post user data in mongodb 
        app.post("/users", async(req, res) => {
            const userData = req.body;
            // console.log(userData);
            const result = await usersCollection.insertOne(userData);
            console.log(result);
        })

        // collect user data from mongodb
        app.get("/users", async(req, res)=> {
            const cursor = usersCollection.find({});
            const result = await cursor.toArray();
            console.log("collect user data");
            res.json(result);
        })

    }finally{
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("image upload server running");
})
app.listen(port, () =>{
    console.log(`image upload server running port ${port}`);
} );