import { list, retrieve, create, update, remove, checkPermission } from '../controllers/groupController'
import express from 'express'
import passport from '../config/passport'
import { validateParam, validateBody } from '../validations'
import { schemas } from '../validations/groupValidation'


const authenticate = passport.authenticate('jwt', { session: false })

const router = express.Router()
router.use(authenticate)

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