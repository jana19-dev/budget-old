import { validateParam, validateBody } from '../validations'
import { schemas } from '../validations/payeeValidation'
import { list, retrieve, create, update, remove, checkPermission } from '../controllers/payeeController'


const router = require('express-promise-router')()

router.route('/')
  .get(
    list
  )
  .post(
    validateBody(schemas.payeeCreateSchema),
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
    validateBody(schemas.payeeUpdateSchema),
    update
  )
  .delete(
    remove
  )


export default router