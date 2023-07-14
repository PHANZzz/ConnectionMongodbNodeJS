const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = 3000;

const uri = "mongodb+srv://sophan:sophan%40123@cluster0.r3agzsk.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/', async (req, res) => {
  try {
    await client.connect();
    const db = client.db("Stock");
    const collection = db.collection("Users");
    const data = await collection.find({}, { projection: { name: 1, password: 1 } }).toArray();
    res.json(data);
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
