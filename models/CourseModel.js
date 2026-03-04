const Database = require("better-sqlite3");

let db;

function makeConnection() {
    db = new Database("course.db");
}

function getAllCourse(availability, sortField, orderby) {
    const allowed = ["rowid", "course_code", "course_name", "course_type"];
    const Sortallowed = allowed.includes(sortField) ? sortField : "rowid";
    const Order = orderby === "DESC" ? "DESC" : "ASC";

    if (availability === "1" || availability === "0") {
        const stmt = db.prepare(
            `SELECT rowid as id, * FROM Courses WHERE availability = ? ORDER BY ${Sortallowed} ${Order}`
        );
        return stmt.all(availability);
    }
    const stmt = db.prepare(`SELECT rowid as id, * FROM Courses ORDER BY ${Sortallowed} ${Order}`);
    return stmt.all();
}

function addCourse(code, name, credit, availability, format, type, desc) {
    const stmt = db.prepare(
        "INSERT INTO Courses VALUES (?,?,?,?,?,?,?)"
    );
    stmt.run(code, name, credit, availability, format, type, desc);
}

function deleteCourse(id) {
    const stmt = db.prepare("DELETE FROM Courses WHERE rowid = ?");
    stmt.run(id);
}

function getCourseById(id) {
    const stmt = db.prepare("SELECT rowid as id, * FROM Courses WHERE rowid = ?");
    return stmt.get(id);
}

function updateCourse(id, code, name, credit, availability, format, type, description) {
    const stmt = db.prepare(
        "UPDATE Courses SET course_code=?, course_name=?, credit=?, availability=?, format=?, course_type=?, description=? WHERE rowid=?"
    );
    stmt.run(code, name, credit, availability, format, type, description, id);
}

module.exports = {
    makeConnection,
    getAllCourse,
    addCourse,
    deleteCourse,
    getCourseById,
    updateCourse
};
