module.exports = {
    setTime: (req, res, next) => {
        req.requestTime = new Date().getTime()
        next();
    }
}