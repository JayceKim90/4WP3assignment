const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");

const Model = require("./app.model.js");

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views",__dirname+ "/views");


app.use( express.urlencoded({extended:false}))


app.get("/", async function(req,res){


    const CourseArray = await Model.getAllCourse();
    
    res.render("main_page",{Courses: CourseArray});

});



async function startServer()
{
    Model.makeConnection();
    app.listen(3000,()=> {console.log("Server listening on port")});


}

startServer();