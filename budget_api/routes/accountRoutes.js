import { list, retrieve, create, update, remove } from '../controllers/accountController'
import PromiseRouter from 'express-promise-router'
import passport from '../config/passport'
import { validateParam, validateBody } from '../validations'
import { schemas } from '../validations/accountValidation'


const router = PromiseRouter();
const authenticate = passport.authenticate('jwt', { session: false })
router.use(authenticate);

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