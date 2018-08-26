import Joi from 'joi'


export const schemas = {
  idSchema: Joi.object().keys({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  }),
  groupCreateSchema: Joi.object().keys({
    name: Joi.string().required(),
    visible: Joi.boolean(),
    budgetID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  }),
  groupUpdateSchema: Joi.object().keys({
    name: Joi.string(),
    visible: Joi.boolean(),
    categoryIDs: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).unique(),
    budgetID: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
  }),
}