const Joi = require('joi');

module.exports.postSchema = Joi.object({
    post: Joi.object({
        title: Joi.string().trim().required(),
        image: Joi.string().trim().required(),
        date: Joi.date().required(),
        categories: Joi.string().trim().required(),
        text: Joi.string().trim().required()
    }).required()
});
