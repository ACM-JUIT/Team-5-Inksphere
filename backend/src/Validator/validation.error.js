const {validationresult}= require('express-validator')

const validate = (req,res,next)=> {
    const error = validationresult(req)
    if(!error.isEmpty()){
        return res.status(400).json({
            message:error.array()
        })
    }
    next()
}

module.exports= {validate}