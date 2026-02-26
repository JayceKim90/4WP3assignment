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


async function getAllCourse()
{
    const results = await db.all("SELECT rowid as id, * FROM Courses");
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


module.exports={makeConnection, getAllCourse, addCourse, deleteCourse};