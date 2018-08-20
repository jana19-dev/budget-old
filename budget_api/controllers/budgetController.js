import Budget from '../models/budgetModel'
import { findByIdCallback } from './helpers'


export async function list(req, res, next) {
  const budgets = await Budget.find({}, null, { sort: { startDate: 1 } })
  res.status(200).json([...budgets])
}

export async function retrieve(req, res, next) {
  const { id } = req.params
  return Budget.findById(id, (error, object)=>findByIdCallback(res, error, object, id, 'Budget'))
}

export async function create(req, res, next) {
  const { name } = req.value.body
  const duplicateName = await Budget.findOne({ name })
  if (duplicateName)
    return res.status(403).json({ error: `Budget already exists with name: ${name}` })
  const budget = await new Budget(req.value.body).save()
  res.status(201).json({ ...budget['_doc'] })
}

export async function update(req, res, next) {
  const { id } = req.params
  let updatedBudget = req.value.body
  return Budget.findByIdAndUpdate(id, updatedBudget, (error, object)=>findByIdCallback(res, error, object, id, 'Budget'))
}

export async function remove(req, res, next) {
  const { id } = req.params
  return Budget.findByIdAndRemove(id, (error, object)=>findByIdCallback(res, error, object, id, 'Budget'))
}
