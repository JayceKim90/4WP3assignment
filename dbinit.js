const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");

async function dbinit(){


    const db = await sqlite.open({
        filename:"course.db",
        driver:sqlite3.Database
    });

    await db.exec("DROP TABLE IF EXISTS Courses");
    await db.exec("CREATE TABLE Courses (course_code TEXT, course_name TEXT, credit REAL, availability BOOL, format TEXT, course_type TEXT )");



    await db.run("INSERT INTO Courses VALUES (?,?,?,?,?,?)",['3DM3','Discrete Mathematics', '3.0','1','Online','SFWRTECH Lv3']);
    await db.run("INSERT INTO Courses VALUES (?,?,?,?,?,?)",['3CS3','Computer Security', '3.0','1','Online','SFWRTECH Lv3']);
    await db.run("INSERT INTO Courses VALUES (?,?,?,?,?,?)",['3MA3','Cntmpry Math Sftwre Dvlpmnt', '3.0','1','Online','SFWRTECH Lv3']);
    await db.run("INSERT INTO Courses VALUES (?,?,?,?,?,?)",['3EE3','Engineering Economics', '3.0','1','Online','GENTECH']);
    await db.run("INSERT INTO Courses VALUES (?,?,?,?,?,?)",['4WP3','Advanced Web Programming', '3.0','1','Online','SFWRTECH Lv4']);
    await db.run("INSERT INTO Courses VALUES (?,?,?,?,?,?)",['4EN3','Entrprneurial Thinkng & Innvtn', '3.0','1','Online','GENTECH']);
    await db.run("INSERT INTO Courses VALUES (?,?,?,?,?,?)",['4MC3','Machine Shop', '6.0','1','In-person','MNFTTECH Lv4']);
    await db.run("INSERT INTO Courses VALUES (?,?,?,?,?,?)",['4CC3','Parallel Programming', '3.0','0','Online','SFWRTECH Lv3']);
     
    
}

dbinit()