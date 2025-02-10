const express = require('express')
const app = express()
const mongoosedb = require('mongoose')
const cors = require('cors')
const port = process.env.port || 4800

mongoosedb.connect('mongodb+srv://miltonvinciline08:8sj1LNvDVJuKb27g@cluster0.vhd5a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log("Database connected"))
app.use(cors())

const dataschema = new mongoosedb.Schema({
    name:String,
    email:String,
    message:String,
})

const datamodel = mongoosedb.model('details',dataschema)

app.use(express.json())
app.post('/detailpage', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || name.trim() === "") {
        return res.status(400).json({ message: "name is required" });
    }

    try {
        // Create a new todo instance
        const newTodo = new datamodel({
            name,
            email,
            message
        });

        // Save the new todo
        await newTodo.save(); // Save the instance to the database

        res.status(200).send("Post operation done");
    } catch (error) {
        console.error("Error creating todo:", error);
        res.status(500).json({ message: error.message });
    }
});
    
app.listen(port,()=>{
    console.log("server is running")
})