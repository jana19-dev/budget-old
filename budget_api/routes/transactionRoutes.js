import { validateParam, validateBody } from '../validations'
import { schemas } from '../validations/transactionValidation'
import { list, retrieve, create, update, remove, checkPermission } from '../controllers/transactionController'


const router = require('express-promise-router')()

router.route('/')
  .get(
    list
  )
  .post(
    validateBody(schemas.transactionCreateSchema),
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
    validateBody(schemas.transactionUpdateSchema),
    update
  )
  .delete(
    remove
  )


export default router