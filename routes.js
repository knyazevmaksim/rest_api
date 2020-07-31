var functions=require("./functions");
const bodyParser=require("body-parser");
var jsonParser=bodyParser.json();
module.exports=function(router){
    router.get("/get",functions.readAll);
    router.get("/get/:id",functions.read);
    router.delete("/delete/:id", functions.delete);
    router.put("/put",jsonParser,functions.update);
    router.post("/post",jsonParser,functions.create)
}