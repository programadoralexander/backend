const { validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
     try{
        validationResult(req).throw()
         return next()
     } catch(err){
        res.status(403)
        res.send({ message: err.array()})
     }
}

module.exports = { validateResult }
