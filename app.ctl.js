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
    
        let errors=[];
        if(isNaN(parseFloat(req.body.credit))|| (parseFloat(req.body.credit))<0.5 || parseFloat(req.body.credit)>6.0)
        {
            errors.push("Validation Error: Credit must be a number between 0.5 and 6.0.");
        }
        if (!req.body.code|| (typeof req.body.code !== "string")|| req.body.code.length>10)
        {
            errors.push("Validation Error: Course Code must be text and under 10 characters.");
        }
        if(errors.length>0){
            const CourseArray = await Model.getAllCourse();
    
            res.render("main_page",{Courses: CourseArray,showAddForm:true,errors:errors });
    

        }else{
        await Model.addCourse(req.body.code, req.body.name, req.body.credit, req.body.availability, req.body.format, req.body.type, req.body.description);
        res.redirect("/");
        }
});

app.get("/delete/:id", async function(req,res){
    await Model.deleteCourse(req.params.id);
    const CourseArray = await Model.getAllCourse();
    
    res.render("main_page",{Courses: CourseArray});
});

app.get("/detail/:id", async function(req,res){

    const course = await Model.DetailCourse(req.params.id);
    res.render("main_page", {detailCourse:course});
});

app.get("/updatecourseform/:id", async function(req,res){

    const CourseArray = await Model.getAllCourse();
    res.render("main_page",{formdata: CourseArray.find( (x) => x.rowid == req.params.id),
                             updatecourse: true});
});


app.post("update/:id", async function(req,res){
   

   await Model.UpdateCourse(req.params.id,
                            req.body.code, 
                            req.body.name, 
                            parseFloat(req.body.credit),
                            req.body.availability, 
                            req.body.format, 
                            req.body.type, 
                            req.body.description);
   
    

});

async function startServer()
{
    Model.makeConnection();
    app.listen(3000,()=> {console.log("Server listening on port")});


}

startServer();