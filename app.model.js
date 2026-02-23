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
    const results = await db.all("SELECT rowid, * FROM Courses");
    return results;
}


module.exports={makeConnection, getAllCourse};