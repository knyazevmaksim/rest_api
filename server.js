const express=require('express');
const properties=require('./config/properties');
const fs=require("fs");
const bodyParser=require("body-parser");
const rout=require("./routes");
var app=express();
rout(app);
app.get("/",function(request,response){
    response.send("Привет я сервер HTTP");
});
app.listen(properties.PORT);