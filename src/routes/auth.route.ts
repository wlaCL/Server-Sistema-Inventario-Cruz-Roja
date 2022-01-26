import { Router } from "express";
import { body, check } from "express-validator";
import { loginApp, loginWeb } from '../controllers/auth.controller';
import { validarCampos } from '../middlewares/validar_campos';

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

export default router; 