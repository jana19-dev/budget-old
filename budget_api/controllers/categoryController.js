import Category from '../models/categoryModel'
import Group from '../models/groupModel'


export async function checkPermission(req, res, next) {
  const category = await Category.findById(req.params.id)
  if (!category) return res.status(404).json({ error: `Category with id ${req.params.id} was not found` }) 
  if (category.userID!==req.user.id) return res.status(401).json({ error: `You don't have access to this Category` })
  res.locals.category = category
  next()
}

export async function list(req, res, next) {
  const categorys = await Category.find({})
  res.status(200).json(categorys)
}

export async function create(req, res, next) {
  const { user } = req
  const { name, groupID } = req.value.body
  const group = await Group.findById(groupID)
  if (!group) return res.status(404).json({ error: `Associated group with id ${groupID} was not found` })
  const duplicateName = await Category.findOne({ name, groupID })
  if (duplicateName) return res.status(403).json({ error: `Category already exists with name: ${name} in group ${groupID}` })
  const category = await Category.create([{...req.value.body, userID: user.id}], {lean:true})
  await group.update({ $push: { categoryIDs: category[0].id } })
  res.status(201).json(category[0])
}

export async function retrieve(req, res, next) {
  return res.status(200).json(res.locals.category)
}

export async function update(req, res, next) {
  await res.locals.category.update(req.value.body)
  return res.status(200).json({...res.locals.category._doc, ...req.value.body})
}

export async function remove(req, res, next) {
  await res.locals.category.remove()
  return res.status(204).json()
}

