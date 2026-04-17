// No role guard needed. This is a no-op middleware.
module.exports = () => (req, res, next) => { next(); };
