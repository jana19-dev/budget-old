import { list, retrieve, create, update, remove } from '../controllers/accountController'
import PromiseRouter from 'express-promise-router'
import passport from '../config/passport'
import { validateParam, validateBody } from '../validations'
import { schemas } from '../validations/accountValidation'


const router = PromiseRouter();
const passportJWT = passport.authenticate('jwt', { session: false })

router.route('/')
  .get(
    list
  )

router.route('/:id')
.get(
  validateParam(schemas.idSchema, 'id'),
  retrieve
)

router.route('/')
  .post(
    validateBody(schemas.accountCreateSchema),
    passportJWT,
    create
  )

router.route('/:id')
  .patch(
    validateBody(schemas.accountUpdateSchema),
    passportJWT,
    update
  )

router.route('/:id')
  .delete(
    validateParam(schemas.idSchema, 'id'),
    passportJWT,
    remove
  )


export default router