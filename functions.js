
var fs=require("fs");
var func={
    create:function(request,response){
        if(!request.body)
            return response.sendStatus(400);
        var content=fs.readFileSync("data/data.json","utf-8");
        var data=JSON.parse(content);

        var newId=0;
        data.forEach(function(elem){
            if(elem.id>newId)
                newId=elem.id;
        });
        newId++;
        var newData=request.body.data;
        data.push({"id":newId,"data":newData});
        content=JSON.stringify(data);
        fs.writeFileSync("data/data.json",content);
        response/*.status(200)*/.send({id:newId, data:newData});
    },
    read:function(request,response){
        var content=fs.readFileSync("data/data.json","utf-8");
        var data=JSON.parse(content);
        var id=request.params.id;
        let i=0;
        for(i; i<data.length; i++)
        {
            if(data[i].id==id)
            {
                response.send(data[i]);
                break;
            }
        }
        if(i===data.length)
            response.status(404).send("not found");
    },
    readAll:function(request,response){
        var content=fs.readFileSync("data/data.json","utf-8");
        var data=JSON.parse(content);
        if(data.length===0)
            response.send("no data");
        else
            response.send(data);
        //response.send(content);
    },
    update:function(request,response){
        if(!request.body)
            return response.sendStatus(400);
        var id=request.body.id;
        var newData=request.body.data;
        var content=fs.readFileSync("data/data.json","utf-8");
        var data=JSON.parse(content);
        let flag=false;
        for(let i=0; i<data.length; i++)
        {
            if(data[i].id==id)
            {
                flag=true;
                data[i].data=newData;
                content=JSON.stringify(data);
                fs.writeFileSync("data/data.json",content);
                response.send({id:id, data:newData});
                break;
            }
        }
            if(!flag)
                response.status(404).send("not found");
        
    },
    delete:function(request,response){
        var id=request.params.id;
        var content=fs.readFileSync("data/data.json","utf-8");
        var data=JSON.parse(content);
        let flag=false;
        var copy={};
        for(let i=0; i<data.length; i++)
        {
            if(data[i].id==id)
            {
                copy=data[i];
                data.splice(i,1);
                flag=true;
                response.send(copy);
                break;
            }
        }
        if(!flag)
            response.status(404).send("not found");
        else
        {
            content=JSON.stringify(data);
            fs.writeFileSync("data/data.json",content);
        }
    }
}
module.exports=func;