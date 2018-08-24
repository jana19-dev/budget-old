import { 
  list, 
  retrieve, 
  create, 
  update, 
  remove 
} from '../controllers/budgetController'
import PromiseRouter from 'express-promise-router'
import passport from '../config/passport'
import { validateParam, validateBody } from '../validations'
import { schemas, validateID } from '../validations/budgetValidation'


const router = PromiseRouter();
const passportJWT = passport.authenticate('jwt', { session: false })

router.route('/')
  .get(
    list
  )

router.route('/:id')
.get(
  validateParam(schemas.idSchema, 'id'),
  validateID(),
  retrieve
)

router.route('/')
  .post(
    validateBody(schemas.budgetCreateSchema),
    passportJWT,
    create
  )

router.route('/:id')
  .patch(
    validateBody(schemas.budgetUpdateSchema),
    passportJWT,
    validateID(),
    update
  )

router.route('/:id')
  .delete(
    validateParam(schemas.idSchema, 'id'),
    passportJWT,
    validateID(),
    remove
  )


export default router