import express from 'express'
import { validateParam, validateBody } from '../validations'
import { schemas } from '../validations/groupValidation'
import { list, retrieve, create, update, remove, checkPermission } from '../controllers/groupController'


const router = express.Router()

router.route('/')
  .get(
    list
  )
  .post(
    validateBody(schemas.groupCreateSchema),
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
    validateBody(schemas.groupUpdateSchema),
    update
  )
  .delete(
    remove
  )


export default router