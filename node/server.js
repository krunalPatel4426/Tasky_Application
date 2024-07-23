const express = require("express");
const app = express();
app.use(express.json());

const port = 8081;

const todoList = ["learn", "practice", "apply", "succed"];

app.get("/todos", (req, res)=>{
    res.status(200).send(todoList);
});
app.post("/todos", (req, res)=>{
    let newtodo = req.body.name;
    todoList.push(newtodo);
    res.status(200).send("task added successfully");
});
app.delete("/todos", (req, res) => {
    let deleteItem = req.body.item;
    console.log(deleteItem);
    todoList.find((e, index) => {
        if(e === deleteItem){
            todoList.splice(index, 1);
            res.status(201).send("task deleted successfully");
        }
    })
})
app.listen(port, ()=>{
    console.log(`express serever is on on port ${port}`);
});