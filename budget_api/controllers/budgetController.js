import Budget from '../models/budgetModel'


export async function checkPermission(req, res, next) {
  const budget = await Budget.findById(req.params.id)
  if (!budget) return res.status(404).json({ error: `Budget with id ${req.params.id} was not found` }) 
  if (budget.userID!==req.user.id) return res.status(401).json({ error: `You don't have access to this Budget` })
  res.locals.budget = budget
  next()
}

export async function list(req, res, next) {
  const budgets = await Budget.find({}, null, { sort: { startDate: 1 } })
  res.status(200).json(budgets)
}

export async function create(req, res, next) {
  const { user } = req
  const { name, startDate } = req.value.body
  const duplicateName = await Budget.findOne({ name, userID: user.id })
  if (duplicateName) return res.status(403).json({ error: `Budget already exists with name: ${name}` })
  const budget = await Budget.create([{name, startDate, userID: user.id}], {lean:true})
  res.status(201).json(budget[0])
}

export async function retrieve(req, res, next) {
  return res.status(200).json(res.locals.budget)
}

export async function update(req, res, next) {
  const {accountIDs, groupIDs} = req.value.body
  if (accountIDs) // Re-ordering accounts
    if (res.locals.budget.accountIDs.length!==accountIDs.length)
      return res.status(422).json({ error: 'Budget accountIDs must contain all existing accountIDs. Only the order can be changed.' })
    else if (!res.locals.budget.accountIDs.every(e => accountIDs.includes(e)))
      return res.status(422).json({ error: 'Budget accountIDs must contain all existing accountIDs. Only the order can be changed.' })
  if (groupIDs) // Re-ordering groups
    if (res.locals.budget.groupIDs.length!==groupIDs.length)
      return res.status(422).json({ error: 'Budget groupIDs must contain all existing groupIDs. Only the order can be changed.' })
    else if (!res.locals.budget.groupIDs.every(e => groupIDs.includes(e)))
      return res.status(422).json({ error: 'Budget groupIDs must contain all existing groupIDs. Only the order can be changed.' })
  await res.locals.budget.update(req.value.body)
  return res.status(200).json({...res.locals.budget._doc, ...req.value.body})
}

export async function remove(req, res, next) {
  await res.locals.budget.remove()
  return res.status(204).json()
}
