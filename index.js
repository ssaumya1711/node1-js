const express = require('express');
const app = express();
const cors = require('cors');
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const url = "mongodb+srv://Saumya:mini171100@cluster0.ovdbg.mongodb.net?retryWrites=true&w=majority";
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin:"*"
}))

/*let task = [];
let taks = [
        {
            id:1,
            message: "Go to gym",
            time: new Date()
        },
        {
            id:2,
            message: "have breakfast",
            time: new Date()
        },
        {
            id:3,
            message: "Go to office",
            time: new Date()
        }
];*/

app.use(express.json());

/*app.get("/list-all-todo",function(req,res){
    res.json(task)
})

app.post("/create-task",function(req,res){
    req.body.id = task.length+1;
    req.body.date = new Date();
    req.body.status = false;
    task.push(req.body);
    res.json({
        message:"Task created successfully"
    })
})

app.put("/update-task/:id",function(req,res){
    let selectTask = task.findIndex(obj => obj.id == req.params.id)
    if(selectTask != -1)
    {
        task[selectTask].status = req.body.status;
    res.json({
        message : "Succcess"
    })
    }
    else
    {
        res.status(400).json({
            message : "No task found"
        })
    }
})

app.delete("/delete-task/:id",function(req,res){
    let selectTask = task.findIndex(obj => obj.id == req.params.id)
    if(selectTask != -1)
    {
        task.splice(selectTask,1);
    res.json({
        message : "Deleted"
    })
    }
    else
    {
        res.status(400).json({
            message : "No task found"
        })
    }
})*/
app.get("/list-all-todo",async function(req,res){
    try {
       let client = await mongoClient.connect(url);
       let db = client.db("todo-app");
       let data = await db.collection("tasks").find({}).toArray();
       await client.close();
       res.json(data);
    } catch (error) {
        res.status(500).json({
            message:"Something went wrong"
        })
    }
})

app.post("/create-task",async function(req,res){
    try {
       let client = await mongoClient.connect(url);
       let db = client.db("todo-app");
       let data = await db.collection("tasks").insertOne(req.body);
       await client.close();
       res.json({
           message:"Task Created"
       })
    } catch (error) {
        res.status(500).json({
            message:"Something went wrong"
        })
    }
})

app.put("/update-task/:id",async function(req,res){
    try {
       let client = await mongoClient.connect(url);
       let db = client.db("todo-app");
       let data = await db.collection("tasks").findOneAndUpdate({_id : mongodb.ObjectId(req.params.id)},{$set: req.body})
       await client.close();
       res.json({
           message:"Task Updated"
       })
    } catch (error) {
        res.status(500).json({
            message:"Something went wrong"
        })
    }
})

app.delete("/delete-task/:id",async function(req,res){
    try {
       let client = await mongoClient.connect(url);
       let db = client.db("todo-app");
       let data = await db.collection("tasks").findOneAndDelete({_id : mongodb.ObjectId(req.params.id)})
       await client.close();
       res.json({
           message:"Task Deleted"
       })
    } catch (error) {
        res.status(500).json({
            message:"Something went wrong"
        })
    }
})

app.listen(PORT,function(){
    console.log(`The app is listening in port ${PORT}`);
})