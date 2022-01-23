import { Router } from "express";
import { body, check } from "express-validator";
import { login } from '../controllers/auth.controller';
import { validarCampos } from '../middlewares/validar_campos';

const router = Router();

router.post('',[
    body("cedula")
        .exists().withMessage("La cedula es obligatoria")
        .isNumeric().withMessage("Cédula no válida"),
    body("password")
      .exists().withMessage("La contraseña es obligatoria"), 
    validarCampos
],login);

export default router; 