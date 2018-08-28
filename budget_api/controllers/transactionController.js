import Transaction from '../models/transactionModel'
import Budget from '../models/budgetModel'
import Category from '../models/categoryModel'
import Account from '../models/accountModel'
import Payee from '../models/payeeModel'


export async function checkPermission(req, res, next) {
  const transaction = await Transaction.findById(req.params.id)
  if (!transaction) return res.status(404).json({ error: `Transaction with id ${req.params.id} was not found` }) 
  if (transaction.userID!==req.user.id) return res.status(401).json({ error: `You don't have access to this Transaction` })
  res.locals.transaction = transaction
  next()
}

export async function list(req, res, next) {
  const transactions = await Transaction.find({userID: req.user.id})
  res.status(200).json(transactions)
}

export async function create(req, res, next) {
  const { user } = req
  const { budgetID, accountID, payeeID, categoryID } = req.value.body
  const budget = await Budget.findById(budgetID)
  if (!budget) return res.status(404).json({ error: `Associated budget with id ${budgetID} was not found` })
  const account = await Account.findById(accountID)
  if (!account) return res.status(404).json({ error: `Associated account with id ${accountID} was not found` })
  const payee = await Payee.findById(payeeID)
  if (!payee) return res.status(404).json({ error: `Associated payee with id ${payeeID} was not found` })
  const category = await Category.findById(categoryID)
  if (!category) return res.status(404).json({ error: `Associated category with id ${categoryID} was not found` })
  const transaction = await Transaction.create([{...req.value.body, userID: user.id}], {lean:true})
  res.status(201).json(transaction[0])
}

export async function retrieve(req, res, next) {
  return res.status(200).json(res.locals.transaction)
}

export async function update(req, res, next) {
  const { accountID, payeeID, categoryID } = req.value.body
  if (accountID) {
    const account = await Account.findById(accountID)
    if (!account) return res.status(404).json({ error: `Associated account with id ${accountID} was not found` })
  }
  if (payeeID) {
    const payee = await Payee.findById(payeeID)
    if (!payee) return res.status(404).json({ error: `Associated payee with id ${payeeID} was not found` })
  }
  if (categoryID) {
    const category = await Category.findById(categoryID)
    if (!category) return res.status(404).json({ error: `Associated category with id ${categoryID} was not found` })
  }
  await res.locals.transaction.update(req.value.body)
  return res.status(200).json({...res.locals.transaction._doc, ...req.value.body})
}

export async function remove(req, res, next) {
  await res.locals.transaction.remove()
  return res.status(204).json()
}

