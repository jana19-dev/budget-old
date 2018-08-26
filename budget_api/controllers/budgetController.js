import Budget from '../models/budgetModel'


export async function list(req, res, next) {
  const budgets = await Budget.find({}, null, { sort: { startDate: 1 } })
  res.status(200).json([...budgets])
}

export async function retrieve(req, res, next) {
  const budget = await Budget.findById(req.params.id)
  if (!budget) return res.status(404).json({ error: `Budget with id ${req.params.id} was not found` }) 
  return res.status(200).json(budget)
}

export async function create(req, res, next) {
  const { user } = req
  const { name, startDate } = req.value.body
  const duplicateName = await Budget.findOne({ name })
  if (duplicateName) return res.status(403).json({ error: `Budget already exists with name: ${name}` })
  const budget = await Budget.create([{name, startDate, userID: user.id}], {lean:true})
  res.status(201).json(budget[0])
}

export async function update(req, res, next) {
  const budget = await Budget.findByIdAndUpdate(req.params.id, req.value.body, {lean:true, new:true})
  return res.status(200).json(budget)
}

export async function remove(req, res, next) {
  const budget = await Budget.findByIdAndRemove(req.params.id)
  if (!budget) return res.status(404).json({ error: `Budget with id ${req.params.id} was not found` }) 
  return res.status(204).json()
}
