const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");


let db;

async function makeConnection()
{
    db = await sqlite.open({
        filename:"course.db",
        driver:sqlite3.Database
    });

}


async function getAllCourse(availability,sortField,orderby)
{     
    const allowed = ["rowid", "course_code","course_name", "course_type"];
    const Sortallowed = allowed.includes(sortField) ? sortField : "rowid";
    const Order = orderby === "DESC" ? "DESC" : "ASC";

    if(availability ==="1" || availability ==="0"){
        return db.all(`SELECT rowid as id, *FROM Courses WHERE availability =? ORDER BY ${Sortallowed} ${Order}`,availability);
    }
    const results = await db.all(`SELECT rowid as id, * FROM Courses ORDER BY ${Sortallowed} ${Order}`);
    return results;
}
async function addCourse(code, name, credit, availability, format, type, desc) {
    await db.run(
        "INSERT INTO Courses VALUES (?,?,?,?,?,?,?)",
        [code, name, credit, availability, format, type, desc]
    );
}

async function deleteCourse(id)
{
    await db.run("DELETE FROM Courses WHERE rowid=?",id);
}

async function DetailCourse(id)
{
    return await db.get("SELECT rowid as id, * FROM Courses WHERE rowid=?",id);
}

async function UpdateCourse(id,code,name,credit,availability,format,type,description)
{   

    await db.run("UPDATE Courses SET course_code=?, course_name=?, credit=?, availability=?, format=?, course_type=?, description=? WHERE rowid=?",
        [code, name, credit, availability, format, type, description, id]);
};

module.exports={makeConnection, getAllCourse, addCourse, deleteCourse,DetailCourse,UpdateCourse};