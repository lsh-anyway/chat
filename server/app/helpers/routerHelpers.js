const Joi = require("joi");

module.exports = {
  validateParam(schema, name) {
    return (req, res, next) => {
      const result = Joi.validate({ param: req.params[name] }, schema);
      if (result.error) {
        res.status(400).json(result.error);
      } else {
        if (!req.value) req.value = {};
        if (!req.value.params) req.value.params = {};

        req.value.params[name] = result.value.param;
        next();
      }
    };
  },

  validateBody(schema) {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        res.status(400).json(result.error);
      } else {
        if (!req.value) req.value = {};
        if (!req.value.body) req.value.body = result.value;

        next();
      }
    };
  },

  schemas: {
    signSchema: Joi.object().keys({
      username: Joi.string()
        .regex(/^[a-zA-Z0-9]{4,16}$/)
        .required(),
      nickname: Joi.string().required(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{6,16}$/)
        .required()
    }),
    authSchema: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{6,16}$/)
        .required()
    })
  }
};
