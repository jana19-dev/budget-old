import { validateParam, validateBody } from '../validations'
import { schemas } from '../validations/categoryValidation'
import { list, retrieve, create, update, remove, checkPermission } from '../controllers/categoryController'


const router = require('express-promise-router')()

router.route('/')
  .get(
    list
  )
  .post(
    validateBody(schemas.categoryCreateSchema),
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
    validateBody(schemas.categoryUpdateSchema),
    update
  )
  .delete(
    remove
  )


export default router