const log4js = require('log4js')
const path = require("path");


log4js.configure({
    appenders: {
        dateFile: {
            type: "dateFile",
            filename: path.join(__dirname, "logs", "out"),
            pattern: "yyyy-MM-dd.log",
            alwaysIncludePattern: true,
            compress: false, // Set to true if you want to compress older files
            keepFileExt: false,
            layout: {
                type: "pattern",
                pattern: "[%d] [%p] - %m"
            }
        }
    },
    categories: {
        default: { appenders: ["dateFile"], level: "info" },
        http: { appenders: ["dateFile"], level: "info" }
    }
});


const logger = log4js.getLogger();


class LogFactory {
    static Info(data){
        logger.info(data);
    }
    static Error(exception, message){
        logger.error(exception, message);
    }
}

module.exports = LogFactory;