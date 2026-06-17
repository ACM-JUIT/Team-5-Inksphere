const ratelimit = require('express-rate-limit')

const commentrate = ratelimit({
    windowMs:1*60*1000,
    max:5
})

module.exports = commentrate