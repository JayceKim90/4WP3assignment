const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");

async function dbinit(){


    const db = await sqlite.open({
        filename:"course.db",
        driver:sqlite3.Database
    });

    await db.exec("DROP TABLE IF EXISTS Courses");
    await db.exec("CREATE TABLE Courses (course_code TEXT, course_name TEXT, credit REAL, availability BOOL, format TEXT, course_type TEXT, description TEXT )");



    await db.run("INSERT INTO Courses VALUES (?,?,?,?,?,?,?)",['3DM3','Discrete Mathematics', '3.0','1','Online','SFWRTECH Lv3','Fundamental discrete mathematics concepts relevant to IT: sets, relations, functions, graphs, propositional logic. State machines. Input/output specifications.']);
    await db.run("INSERT INTO Courses VALUES (?,?,?,?,?,?,?)",['3CS3','Computer Security', '3.0','1','Online','SFWRTECH Lv3', 'Network and software security, cryptography algorithms, including symmetric and public-key encryption, malware, user authentication, firewalls, vulnerabilities, policies and best practices, attack and defense strategies.']);
    await db.run("INSERT INTO Courses VALUES (?,?,?,?,?,?,?)",['3MA3','Cntmpry Math Sftwre Dvlpmnt', '3.0','1','Online','SFWRTECH Lv3','Advanced functions, differential calculus, introductory integral calculus, discrete signals, z-transforms.']);
    await db.run("INSERT INTO Courses VALUES (?,?,?,?,?,?,?)",['3EE3','Engineering Economics', '3.0','1','Online','GENTECH','Costing methods for engineering designs and processes; minimum attractive rate of return, return sensitivities, time value of money, internal rates of return, payback period, amortization of equipment and capital cost allowance structures.']);
    await db.run("INSERT INTO Courses VALUES (?,?,?,?,?,?,?)",['4WP3','Advanced Web Programming', '3.0','1','Online','SFWRTECH Lv4','Advanced technologies for web development, apps for mobile, desktop and cloud based systems, client and server side web APIs.']);
    await db.run("INSERT INTO Courses VALUES (?,?,?,?,?,?,?)",['4EN3','Entrprneurial Thinkng & Innvtn', '3.0','1','Online','GENTECH','This course introduces students to the interrelationship of entrepreneurial thinking and innovation at both the industry and firm level.']);
    await db.run("INSERT INTO Courses VALUES (?,?,?,?,?,?,?)",['4MC3','Machine Shop', '6.0','1','In-person','MNFTTECH Lv4','A machine shop course teaches students to safely operate lathes, mills, and precision tools, develop technical drawing skills, measure accurately, and fabricate metal components to industry standards.']);
    await db.run("INSERT INTO Courses VALUES (?,?,?,?,?,?,?)",['4CC3','Parallel Programming', '3.0','0','Online','SFWRTECH Lv3','Models of parallel computation. Performance measurement. Shared memory and synchronization. Parallel data structures, searching and sorting. Scheduling and work distribution.']);
     
    
}

dbinit()