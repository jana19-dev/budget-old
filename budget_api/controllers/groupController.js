import Group from '../models/groupModel'
import Budget from '../models/budgetModel'


export async function checkPermission(req, res, next) {
  const group = await Group.findById(req.params.id)
  if (!group) return res.status(404).json({ error: `Group with id ${req.params.id} was not found` }) 
  if (group.userID!==req.user.id) return res.status(401).json({ error: `You don't have access to this Group` })
  res.locals.group = group
  next()
}

export async function list(req, res, next) {
  const groups = await Group.find({})
  res.status(200).json(groups)
}

export async function create(req, res, next) {
  const { user } = req
  const { name, budgetID } = req.value.body
  const budget = await Budget.findById(budgetID)
  if (!budget) return res.status(404).json({ error: `Associated budget with id ${budgetID} was not found` })
  const duplicateName = await Group.findOne({ name, budgetID })
  if (duplicateName) return res.status(403).json({ error: `Group already exists with name: ${name} in budget ${budgetID}` })
  const group = await Group.create([{...req.value.body, userID: user.id}], {lean:true})
  await budget.update({ $push: { groupIDs: group[0].id } })
  res.status(201).json(group[0])
}

export async function retrieve(req, res, next) {
  return res.status(200).json(res.locals.group)
}

export async function update(req, res, next) {
  const {categoryIDs} = req.value.body
  if (categoryIDs) // Re-ordering categories
    if (res.locals.group.categoryIDs.length!==categoryIDs.length)
      return res.status(422).json({ error: 'Group categoryIDs must contain all existing categoryIDs. Only the ordering can be changed.' })
    else if (!res.locals.group.categoryIDs.every(e => categoryIDs.includes(e)))
      return res.status(422).json({ error: 'Group categoryIDs must contain all existing categoryIDs. Only the ordering can be changed.' })
  await res.locals.group.update(req.value.body)
  return res.status(200).json({...res.locals.group._doc, ...req.value.body})
}

export async function remove(req, res, next) {
  await res.locals.group.remove()
  return res.status(204).json()
}

