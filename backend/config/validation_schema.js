const Joi = require('joi');

module.exports = {
    userSchema: Joi.object({
        userName: Joi.string().min(2).required(),
        email: Joi.string().email().lowercase().required(),
        password:  Joi.string().min(6).required(),
        firstName: Joi.string().min(2).required(),
        lastName:  Joi.string().min(2).required(),
        displayName:  Joi.string().min(2).required(),
        nickname:  Joi.string().min(2),
        website:  Joi.string().min(2),
        bio: Joi.string().min(20),
        jabber: Joi.string().min(2),
        aolIm: Joi.string().min(2),
        yahooIm: Joi.string().min(2)
    })
}