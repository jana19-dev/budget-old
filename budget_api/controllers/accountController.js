import Account from '../models/accountModel'
import Budget from '../models/budgetModel'
import { findByIdCallback } from './helpers'


export async function list(req, res, next) {
  const accounts = await Account.find({}, null, { sort: { startDate: 1 } })
  res.status(200).json([...accounts])
}

export async function retrieve(req, res, next) {
  const { id } = req.params
  return Account.findById(id, (error, object)=>findByIdCallback(res, error, object, id, 'Account'))
}

export async function create(req, res, next) {
  const { name, budgetID } = req.value.body
  const duplicateName = await Account.findOne({ name, budgetID })
  if (duplicateName)
    return res.status(403).json({ error: `Account already exists with name: ${name}` })
  const budget = await Budget.findById(budgetID)
  if (!budget)
    return res.status(404).json({ error: `Budget with id ${budgetID} was not found` });
  const account = await Account.create(req.value.body)
  await budget.update({accountIDs: [...budget.accountIDs, account._doc._id]})
  res.status(201).json({ ...account['_doc'] })
}

export async function update(req, res, next) {
  const { id } = req.params
  let updatedAccount = req.value.body
  return Account.findByIdAndUpdate(id, updatedAccount, (error, object)=>findByIdCallback(res, error, object, id, 'Account'))
}

export async function remove(req, res, next) {
  const { id } = req.params
  return Account.findOneAndRemove({_id: id}, (error, object)=>findByIdCallback(res, error, object, id, 'Account'))
}
