
const express = require('express');
const { route } = require('express/lib/application');
const mongodb = require('mongodb')

const router = express.Router();


//get post


router.get('/test', async (req,res) => {
  
    res.send("pain")
} );



router.get('/', async (req,res) => {
    const lessons = await loadlesson();
    res.send(await lessons.find({}).toArray())
} );



router.get('/orders', async (req,res) => {
    const orders = await loadorders();
    res.send(await orders.find({}).toArray())
} );

//add post

router.post('/orders', async(req, res) => {

    const orders = await loadorders();
    await orders.insertOne({

        Firstname: req.body.Firstname,
        Lastname: req.body.Lastname,
        Phonenumber: req.body.Phonenumber,
        Lessonid: req.body.Lessonid,
        Spaces: req.body.spaces
    });

    res.status(201).send()
})




async function loadlesson() {

    try{
    const client = await mongodb.MongoClient.connect
    (process.env.MONGODB_URI ||'mongodb+srv://Jubayer:Jubayer@cluster0.jwtcn5h.mongodb.net/?retryWrites=true&w=majority',
     {UseNewUrlParser: true})


return client.db("webstore").collection('lessons');

} catch(err) {
    alert(err); // TypeError: failed to fetch
  }
}



async function loadorders() {

    try{

    const client = await mongodb.MongoClient.connect
    (process.env.MONGODB_URI|| 'mongodb+srv://Jubayer:Jubayer@cluster0.jwtcn5h.mongodb.net/?retryWrites=true&w=majority' ,
     {UseNewUrlParser: true})


return client.db("webstore").collection('orders');


} catch(err) {
    alert(err); // TypeError: failed to fetch
  }
}




module.exports = router;