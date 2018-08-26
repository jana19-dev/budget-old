import { list, retrieve, create, update, remove, checkPermission } from '../controllers/budgetController'
import PromiseRouter from 'express-promise-router'
import passport from '../config/passport'
import { validateParam, validateBody } from '../validations'
import { schemas } from '../validations/budgetValidation'


const router = PromiseRouter();
const authenticate = passport.authenticate('jwt', { session: false })
router.use(authenticate);

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