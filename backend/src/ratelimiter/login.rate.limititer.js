const ratelimit = require('express-rate-limit')

const loginrate = ratelimit({
    windowMs : 15 * 60 * 1000,
    max : 5
})

module.exports = loginrate