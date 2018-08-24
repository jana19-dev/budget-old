import Joi from 'joi';
import Budget from '../models/budgetModel'


export function validateID() {
  return async (req, res, next) => {
    const id = req.params.id
    const budget = await Budget.findById(id)
    if (!budget) return res.status(404).json({ error: `Budget with id ${id} was not found` })  
    if (!req.value) req.value = {}
    if (!req.value.body) req.value.body = {}
    if (req.method === "DELETE" || req.method === "GET") {
      req.value.body.budget = budget 
    } else if (req.method === "PATCH") {
      const updatedBudget = {...req.value.body}
      req.value.body = {}
      req.value.body = {budget, updatedBudget}
    }
    next();
  };
}

export const schemas = {
  idSchema: Joi.object().keys({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().error(new Error('ID should be a valid ObjectID.'))
  }),
  budgetCreateSchema: Joi.object().keys({
    name: Joi.string().required(),
    startDate: Joi.date().iso().required(),
  }),
  budgetUpdateSchema: Joi.object().keys({
    name: Joi.string(),
    startDate: Joi.date().iso(),
    payeeIDs: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)),
    acountIDs: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)),
    groupIDs: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
  }),
}


