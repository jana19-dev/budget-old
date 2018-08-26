import Account from '../models/accountModel'
import Budget from '../models/budgetModel'


export async function list(req, res, next) {
  const accounts = await Account.find({}, null, { sort: { startDate: 1 } })
  res.status(200).json([...accounts])
}

export async function retrieve(req, res, next) {
  const account = await Account.findById(req.params.id)
  if (!account) return res.status(404).json({ error: `Account with id ${req.params.id} was not found` }) 
  return res.status(200).json(account)
}

export async function create(req, res, next) {
  const { name, budgetID } = req.value.body
  const duplicateName = await Account.findOne({ name })
  if (duplicateName) return res.status(403).json({ error: `Account already exists with name: ${name}` })
  const budget = await Budget.findById(budgetID)
  if (!budget) return res.status(404).json({ error: `Budget with id ${budgetID} was not found` })
  const account = await Account.create([req.value.body], {lean:true})
  await budget.update({ $push: { accountIDs: account[0].id } })
  res.status(201).json(account[0])
}

export async function update(req, res, next) {
  const account = await Account.findByIdAndUpdate(req.params.id, req.value.body, {lean:true, new:true})
  return res.status(200).json(account)
}

export async function remove(req, res, next) {
  const account = await Account.findByIdAndRemove(req.params.id)
  if (!account) return res.status(404).json({ error: `Account with id ${req.params.id} was not found` }) 
}
