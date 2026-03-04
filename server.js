const { execSync } = require("child_process");
const CourseModel = require("./models/CourseModel.js");
const app = require("./app.js");

const PORT = 3000;

function freePort(port) {
    try {
        if (process.platform === "win32") {
            const out = execSync(`netstat -ano | findstr :${port}`, { encoding: "utf8", stdio: ["pipe", "pipe", "ignore"] });
            const lines = out.trim().split(/\r?\n/);
            const pids = new Set();
            for (const line of lines) {
                const m = line.trim().split(/\s+/).pop();
                if (m && /^\d+$/.test(m)) pids.add(m);
            }
            pids.forEach(function (pid) { try { execSync("taskkill /F /PID " + pid, { stdio: "ignore" }); } catch (_) {} });
        } else {
            execSync(`lsof -ti:${port} | xargs kill -9`, { stdio: "ignore" });
        }
        console.log("Stopped existing process on port " + port);
    } catch (e) {}
}

function start() {
    try {
        freePort(PORT);
        CourseModel.makeConnection();
        const server = app.listen(PORT, function () {
            console.log("Server running at http://localhost:" + PORT);
            console.log("Press Ctrl+C to stop. Logs will appear below.");
        });
        server.on("error", function (err) {
            console.error("Server error:", err.message);
            process.exit(1);
        });
    } catch (err) {
        console.error("Failed to start:", err.message);
        process.exit(1);
    }
}

start();
