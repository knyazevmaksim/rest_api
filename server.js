const express=require('express');
const properties=require('./config/properties');
const fs=require("fs");
const bodyParser=require("body-parser");
const rout=require("./routes");
var app=express();
rout(app);
app.get("/",function(request,response){
    fs.readFile("public/index.html",function(err,data)
    {
        if(err)
            {
                response.statusCode=404;
            response.end("file not found");
            }
            else
            {
                response.end(data);
            }
    });
    //response.send("Привет я сервер HTTP");
});
app.listen(properties.PORT);