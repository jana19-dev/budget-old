import { findByIdCallback } from './helpers'
import Budget from '../models/budgetModel'


export async function list(req, res, next) {
  const budgets = await Budget.find({}, null, { sort: { startDate: 1 } })
  res.status(200).json([...budgets])
}

export async function retrieve(req, res, next) {
  return res.status(200).json(req.value.body.budget);
}

export async function create(req, res, next) {
  const { user } = req
  const { name, startDate } = req.value.body
  const duplicateName = await Budget.findOne({ name })
  if (duplicateName)
    return res.status(403).json({ error: `Budget already exists with name: ${name}` })
  const budget = await Budget.create({name, startDate, userID: user.id})
  res.status(201).json({ ...budget['_doc'] })
}

export async function update(req, res, next) {
  const { budget, updatedBudget } = req.value.body
  await budget.update({...updatedBudget})
  return res.status(200).json({...budget._doc, ...updatedBudget});
}

export async function remove(req, res, next) {
  await req.value.body.budget.remove()
  return res.status(204).json();
}
