import { Router } from "express";
import { body, check } from "express-validator";
import { loginApp, loginWeb, changePasswordWeb, changePasswordUser } from '../controllers/auth.controller';
import { validarCampos } from '../middlewares/validar_campos';
import { validarJWT } from '../middlewares/validar_jwt.middleware';
import { isUserWeb } from '../middlewares/validar_rol';

const router = Router();

router.post('/app',[
    body("cedula")
        .exists().withMessage("La cedula es obligatoria")
        .isNumeric().withMessage("Cédula no válida"),
    body("password")
      .exists().withMessage("La contraseña es obligatoria"), 
    validarCampos
],loginApp);

router.post('/web',[
  body("cedula")
      .exists().withMessage("La cedula es obligatoria")
      .isNumeric().withMessage("Cédula no válida"),
  body("password")
    .exists().withMessage("La contraseña es obligatoria"), 
  validarCampos
],loginWeb);

router.put('/change/password/user',[
  validarJWT,
  isUserWeb,
  check('cedula')
    .exists().withMessage("La cédula es obligatoria")
    .isLength({min: 10, max: 10}).withMessage("Cédula no válida")
    .isNumeric().withMessage("Cédula no válida"),
  check('contrasena')
    .exists().withMessage("La contraseña es obligatoria"),
  check('nuevacontrasena')
    .exists().withMessage("La nueva constraseña es obligatoria")
    .isLength({min:10, max: 16}).withMessage("La nueva contraseña debe tener entre 10 y 16 carácteres"),
  validarCampos    
],changePasswordWeb)


router.put('/change/pwuser',[
  validarJWT,
  check('contrasena')
    .exists().withMessage("La contraseña es obligatoria"),
  check('nuevacontrasena')
    .exists().withMessage("La nueva constraseña es obligatoria")
    .isLength({min:10, max: 16}).withMessage("La nueva contraseña debe tener entre 10 y 16 carácteres"),
  validarCampos    
],changePasswordUser)



export default router; 