const CourseModel = require("../models/CourseModel.js");

const apiList = [
    { method: "get", path: "GET /", description: "View course list (all, or filtered/sorted)", usage: "Open http://localhost:3000/ in the browser. Query: ?availability=1 or 0, ?sort=course_code|course_name|course_type|rowid, ?order=ASC|DESC. Example: /?sort=course_code&order=ASC" },
    { method: "get", path: "GET /add", description: "Show add-course form", usage: "Go to http://localhost:3000/add or click '+Add course' in the sidebar" },
    { method: "post", path: "POST /addCourse", description: "Save new course (Create)", usage: "Fill code, name, credit (0.5–6), availability, format, type, description in the add form and click 'Save Course'" },
    { method: "get", path: "GET /detail/:id", description: "View course detail", usage: "Click the magnifier icon in the list or go to /detail/1, /detail/2, etc. (id is rowid)" },
    { method: "get", path: "GET /updatecourseform/:id", description: "Show update-course form", usage: "Click the pencil icon in the list or go to /updatecourseform/1, etc." },
    { method: "post", path: "POST /update/:id", description: "Save course update (Update)", usage: "Change fields in the update form and click 'Update Course'" },
    { method: "get", path: "GET /delete/:id", description: "Delete course (Delete)", usage: "Click the X icon in the list or go to /delete/1, etc.; the course is removed and you are redirected to the list" },
    { method: "get", path: "GET /api-docs", description: "API list and usage", usage: "Go to http://localhost:3000/api-docs or click 'API List' in the sidebar" }
];

function apiDocs(req, res) {
    res.render("api_docs", { apiList });
}

function list(req, res) {
    const availability = req.query.availability;
    const sortField = req.query.sort;
    const orderby = req.query.order;
    const courses = CourseModel.getAllCourse(availability, sortField, orderby);
    res.render("main_page", { Courses: courses });
}

function addForm(req, res) {
    const courses = CourseModel.getAllCourse();
    const formdata = { code: "", name: "", credit: "", type: "", description: "", availabilityYes: false, availabilityNo: false, formatOnline: false, formatInPerson: false };
    res.render("main_page", { Courses: courses, showAddForm: true, formdata });
}

function addSubmit(req, res) {
    const errors = [];
    if (isNaN(parseFloat(req.body.credit)) || parseFloat(req.body.credit) < 0.5 || parseFloat(req.body.credit) > 6.0) {
        errors.push("Validation Error: Credit must be a number between 0.5 and 6.0.");
    }
    if (!req.body.code || typeof req.body.code !== "string" || req.body.code.length > 10) {
        errors.push("Validation Error: Course Code must be text and under 10 characters.");
    }
    if (errors.length > 0) {
        const courses = CourseModel.getAllCourse();
        const formdata = {
            code: req.body.code || "",
            name: req.body.name || "",
            credit: req.body.credit || "",
            availability: req.body.availability,
            format: req.body.format,
            type: req.body.type || "",
            description: req.body.description || "",
            availabilityYes: req.body.availability === "1",
            availabilityNo: req.body.availability === "0",
            formatOnline: req.body.format === "Online",
            formatInPerson: req.body.format === "In-person"
        };
        res.render("main_page", { Courses: courses, showAddForm: true, errors, hasErrors: true, formdata });
    } else {
        CourseModel.addCourse(req.body.code, req.body.name, req.body.credit, req.body.availability, req.body.format, req.body.type, req.body.description);
        res.redirect("/");
    }
}

function deleteOne(req, res) {
    CourseModel.deleteCourse(req.params.id);
    res.redirect("/");
}

function detail(req, res) {
    const course = CourseModel.getCourseById(req.params.id);
    res.render("main_page", { detailCourse: course });
}

function updateForm(req, res) {
    const course = CourseModel.getCourseById(req.params.id);
    const formdata = course ? {
        ...course,
        formatOnline: course.format === "Online",
        formatInPerson: course.format === "In-person",
        availabilityYes: course.availability === 1 || course.availability === "1",
        availabilityNo: course.availability === 0 || course.availability === "0"
    } : null;
    res.render("main_page", { formdata, updatecourse: course });
}

function updateSubmit(req, res) {
    const course = CourseModel.getCourseById(req.params.id);
    const errors = [];
    if (isNaN(parseFloat(req.body.credit)) || parseFloat(req.body.credit) < 0.5 || parseFloat(req.body.credit) > 6.0) {
        errors.push("Validation Error: Credit must be a number between 0.5 and 6.0.");
    }
    if (!req.body.code || typeof req.body.code !== "string" || req.body.code.length > 10) {
        errors.push("Validation Error: Course Code must be text and under 10 characters.");
    }
    if (errors.length > 0) {
        const formdata = {
            id: req.params.id,
            course_code: req.body.code || "",
            course_name: req.body.name || "",
            credit: req.body.credit || "",
            availability: req.body.availability,
            format: req.body.format,
            course_type: req.body.type || "",
            description: req.body.description || "",
            formatOnline: req.body.format === "Online",
            formatInPerson: req.body.format === "In-person",
            availabilityYes: req.body.availability === "1",
            availabilityNo: req.body.availability === "0"
        };
        res.render("main_page", { formdata, updatecourse: course, errors, hasErrors: true });
    } else {
        CourseModel.updateCourse(
            req.params.id,
            req.body.code,
            req.body.name,
            parseFloat(req.body.credit),
            req.body.availability,
            req.body.format,
            req.body.type,
            req.body.description
        );
        res.redirect("/");
    }
}

module.exports = {
    apiDocs,
    list,
    addForm,
    addSubmit,
    deleteOne,
    detail,
    updateForm,
    updateSubmit
};
