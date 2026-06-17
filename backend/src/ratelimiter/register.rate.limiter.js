const ratelimit = require('express-rate-limit')

const registerrate = ratelimit({
    windowMs: 15* 60* 1000,
    max:5
})

module.exports = registerrate