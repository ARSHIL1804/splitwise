const LogFactory = require("../logging/logger");


function requestHandler(req, res, next) {
    try {
        const start = process.hrtime();
        LogFactory.Info('Request Started >> ' + req.path);
        res.on("finish", ()=>{
            const [seconds, nanoseconds] = process.hrtime(start);
            const duration = (seconds * 1000 + nanoseconds / 1e6).toFixed(2);
            LogFactory.Info(`Request Completed in ${duration}ms with status code - ${res.statusCode}`);
        })
        next()
    } catch (error) {
        console.log(error);
    }
}


module.exports = { requestHandler};