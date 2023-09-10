const { getUser } = require('../service/auth')

async function restrictToLoggedUserOnly(req, res, next) {
    const userUid = req.cookies?.uid

    if (!userUid) return res.redirect('/login')

    const user = getUser(userUid);
    req.user = user 
    next()
}

module.exports = {restrictToLoggedUserOnly}; 