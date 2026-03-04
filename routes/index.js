const courseController = require("../controllers/courseController.js");

function bindRoutes(app) {
    app.get("/api-docs", courseController.apiDocs);
    app.get("/", courseController.list);
    app.get("/add", courseController.addForm);
    app.post("/addCourse", courseController.addSubmit);
    app.get("/delete/:id", courseController.deleteOne);
    app.get("/detail/:id", courseController.detail);
    app.get("/updatecourseform/:id", courseController.updateForm);
    app.post("/update/:id", courseController.updateSubmit);
}

module.exports = { bindRoutes };
