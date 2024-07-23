const http = require("http");
const { writeHeapSnapshot } = require("v8");
const port = 8081;

/*
>> GET: Inorder to get data from server
>> POST: Sending data to server
>> DELETE: Deleting the data from database
>> PATCH: Updating certain fields
>> PUT: Full Update
*/

const todoList = ["learn", "practice", "apply", "suceed"];
http.createServer((req, res) =>{
    const {method, url} = req;
    console.log({method, url});

    if(url === "/todos"){
        if(method === "GET"){
            res.writeHead(200, {"content-type": "text'html"});
            res.write(todoList.toString());
        }else if(method === "POST"){
            let body = "";
            req.on("error", (err) => {
                console.err(err);
            }).on("data", (chunk) => {
                body += chunk;
                console.log(chunk);
            }).on("end", () => {
                body = JSON.parse(body);
                console.log(body);

                let newtoDO = todoList;
                newtoDO.push(body.body);
            });
        }else if(method === "DELETE"){
            let body = "";
            req.on("error", (err) => {
                console.error(err);
            }).on("data", (chunk)=> {
                body += chunk;
            }).on("end", ()=>{
                body = JSON.parse(body);
                let deleteItem = body.item;
                console.log(deleteItem);
                todoList.find((elem, index)=>{
                    if(elem === deleteItem){
                        todoList.splice(index, 1);
                    }
                });
            });
        }else{
            res.writeHead(501);
        }
    }else{
        writeHead(404);
    }
    res.end();
}).listen(port, () => {
    console.log(`Node js server started on port ${port}`);
});