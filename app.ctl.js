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


app.get("/add", async function(req,res){

    const CourseArray = await Model.getAllCourse();
    
    res.render("main_page",{Courses: CourseArray,showAddForm:true});
})

app.post("/addCourse", async function(req,res) {
    
    
        await Model.addCourse(req.body.code, req.body.name, req.body.credit, req.body.availability, req.body.format, req.body.type, req.body.description);
        const CourseArray = await Model.getAllCourse();
    
        res.render("main_page",{Courses: CourseArray});
    
});



async function startServer()
{
    Model.makeConnection();
    app.listen(3000,()=> {console.log("Server listening on port")});


}

startServer();