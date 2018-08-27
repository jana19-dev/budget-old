import Account from '../models/accountModel'
import Budget from '../models/budgetModel'


export async function checkPermission(req, res, next) {
  const account = await Account.findById(req.params.id)
  if (!account) return res.status(404).json({ error: `Account with id ${req.params.id} was not found` }) 
  if (account.userID!==req.user.id) return res.status(401).json({ error: `You don't have access to this Account` })
  res.locals.account = account
  next()
}

export async function list(req, res, next) {
  const accounts = await Account.find({userID: req.user.id})
  res.status(200).json(accounts)
}

export async function create(req, res, next) {
  const { user } = req
  const { name, budgetID } = req.value.body
  const budget = await Budget.findById(budgetID)
  if (!budget) return res.status(404).json({ error: `Associated budget with id ${budgetID} was not found` })
  const duplicateName = await Account.findOne({ name, budgetID })
  if (duplicateName) return res.status(403).json({ error: `Account already exists with name: ${name} in budget ${budgetID}` })
  const account = await Account.create([{...req.value.body, userID: user.id}], {lean:true})
  await budget.update({ $push: { accountIDs: account[0].id } })
  res.status(201).json(account[0])
}

export async function retrieve(req, res, next) {
  return res.status(200).json(res.locals.account)
}

export async function update(req, res, next) {
  await res.locals.account.update(req.value.body)
  return res.status(200).json({...res.locals.account._doc, ...req.value.body})
}

export async function remove(req, res, next) {
  await res.locals.account.remove()
  return res.status(204).json()
}
