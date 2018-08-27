import Payee from '../models/payeeModel'
import Budget from '../models/budgetModel'
import Category from '../models/categoryModel'


export async function checkPermission(req, res, next) {
  const payee = await Payee.findById(req.params.id)
  if (!payee) return res.status(404).json({ error: `Payee with id ${req.params.id} was not found` }) 
  if (payee.userID!==req.user.id) return res.status(401).json({ error: `You don't have access to this Payee` })
  res.locals.payee = payee
  next()
}

export async function list(req, res, next) {
  const payees = await Payee.find({})
  res.status(200).json(payees)
}

export async function create(req, res, next) {
  const { user } = req
  const { name, budgetID, defaultCategoryID } = req.value.body
  const budget = await Budget.findById(budgetID)
  if (!budget) return res.status(404).json({ error: `Associated budget with id ${budgetID} was not found` })
  if (defaultCategoryID) {   
    const category = await Category.findById(defaultCategoryID)
    if (!category) return res.status(404).json({ error: `Associated category with id ${defaultCategoryID} was not found` })
  }
  const duplicateName = await Payee.findOne({ name, budgetID })
  if (duplicateName) return res.status(403).json({ error: `Payee already exists with name: ${name} in budget ${budgetID}` })
  const payee = await Payee.create([{...req.value.body, userID: user.id}], {lean:true})
  res.status(201).json(payee[0])
}

export async function retrieve(req, res, next) {
  return res.status(200).json(res.locals.payee)
}

export async function update(req, res, next) {
  const { defaultCategoryID } = req.value.body
  if (defaultCategoryID) {   
    const category = await Category.findById(defaultCategoryID)
    if (!category) return res.status(404).json({ error: `Associated category with id ${defaultCategoryID} was not found` })
  }
  await res.locals.payee.update(req.value.body)
  return res.status(200).json({...res.locals.payee._doc, ...req.value.body})
}

export async function remove(req, res, next) {
  await res.locals.payee.remove()
  return res.status(204).json()
}

