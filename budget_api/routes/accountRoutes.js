import express from 'express'
import { validateParam, validateBody } from '../validations'
import { schemas } from '../validations/accountValidation'
import { list, retrieve, create, update, remove, checkPermission } from '../controllers/accountController'


const router = express.Router()

router.route('/')
  .get(
    list
  )
  .post(
    validateBody(schemas.accountCreateSchema),
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
    validateBody(schemas.accountUpdateSchema),
    update
  )
  .delete(
    remove
  )


export default router