const express = require("express");
const bodyParser = require("body-parser");
const chalk = require("chalk");
const cors = require("cors");
const config = require("config");
const app = express();
const pack = require("../package");
const Logger = require("morgan");
const origins = [
];
mode = process.env.NODE_ENV;

app.use(Logger(mode == "dev" ? "dev" : "combined"));

if (mode == "production") {
    const options = {
        origin: origins, // 접근 권한을 부여하는 도메인
        credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
        optionsSuccessStatus: 200, // 응답 상태 200으로 설정
    };
    app.use(cors(options));
} else {
    app.use(cors());
}

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(require("express-status-monitor")());
require("./routes")(app);

app.use(haltOnTimedout);
function haltOnTimedout(req, res, next) {
    if (!req.timedout) next();
}
const start = () => {
    app.listen(config.get(`${mode}.port`), () => {
        console.log(chalk.yellow(".......................................")); //eslint-disable-line
        console.log(chalk.green(config.get(`${mode}.name`))); //eslint-disable-line
        console.log(chalk.green(`Port:\t\t${config.get(`${mode}.port`)}`)); //eslint-disable-line
        console.log(chalk.green(`Mode:\t\t${config.get(`${mode}.mode`)}`)); //eslint-disable-line
        console.log(chalk.green(`App version:\t${pack.version}`)); //eslint-disable-line
        console.log(chalk.green("database connection is established"));
        console.log(
            chalk.green(`DB:\t\t${config.get(`${mode}.database.database`)}`)
        );
        console.log(chalk.green(`Now:\t\t${new Date().toString()}`));
        console.log(chalk.yellow(".......................................")); //eslint-disable-line
    });
};

start();
