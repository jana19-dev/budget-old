import { regsiter, login, remove } from '../controllers/userController';
import PromiseRouter from 'express-promise-router';
import passport from '../config/passport';
import { validateParam, validateBody } from '../validations';
import { schemas } from '../validations/userValidation';


const router = PromiseRouter();
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/register')
  .post(
    validateBody(schemas.userRegisterSchema),
    regsiter
  )

router.route('/login')
  .post(
    validateBody(schemas.userLoginSchema),
    passportSignIn,
    login
  )

router.route('/delete')
  .delete(
    passportJWT,
    remove
  )


export default router;