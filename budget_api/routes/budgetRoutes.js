import express from 'express'
import { validateParam, validateBody } from '../validations'
import { schemas } from '../validations/budgetValidation'
import { list, retrieve, create, update, remove, checkPermission } from '../controllers/budgetController'


const router = require('express-promise-router')()

router.route('/')
  .get(
    list
  )
  .post(
    validateBody(schemas.budgetCreateSchema),
    create
  )

router.route('/:id')
  .all(
    validateParam(schemas.idSchema, 'id'),
    checkPermission
  )
  .get(
    retrieve
  )
  .patch(
    validateBody(schemas.budgetUpdateSchema),
    update
  )
  .delete(
    remove
  )


export default router