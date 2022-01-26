import { Router } from "express";
import { check } from "express-validator";
import { postUsuario, deleteUsuario, actualizarUsuario, getUsuario, getUsuarios } from '../controllers/usuario.controller';
import { AlmenosUnCampo, tamanoContrasena } from '../middlewares/validar_campos_usuario';
import { validarCampos } from '../middlewares/validar_campos';
import { existeUsuario, noExistePersona, usuarioActivo } from '../db/usuario_validators.db';

const router = Router(); 

//crear usuario
router.post('', [   
    check('cedula')
        .exists().withMessage('El cedula es obligatoria')
        .isNumeric().withMessage('La cédula debe contener solo numeros')
        .isLength({min:10, max:10}).withMessage('La cédula debe tener 10 dígitos'), 
    check('nombre')
        .exists().withMessage('El nombre es obligatorio')
        .isLength({min:3}).withMessage("El nombre debe tener mínimo tres carácteres")
        .matches(/^[A-Za-z\s]+$/).withMessage('El nombre solo debe tener letras'), 
    check('apellido')
        .exists().withMessage("El apellido es obligatorio")
        .isLength({min:3}).withMessage("El apellido debe tener mínimo tres carácteres")
        .matches(/^[A-Za-z\s]+$/).withMessage('El nombre solo debe tener letras'), 
    check('cedula').custom(noExistePersona), 
    check('rol')
        .exists().withMessage("El rol es obligatorio")
        .isIn(['user_web', 'user_app']).withMessage("rol no válido: [user_web, user_app]"),
    check('contrasena')
        .exists().withMessage("La contraseña es obligatoria")
        .isLength({min:10}).withMessage("La constraseña debe tener un un mínimo de 10 caracteres"),
    validarCampos,   
],postUsuario);

// eliminar usuario
router.delete('/:cedula',[    
    check('cedula')
        .exists().withMessage('La cedula es obligatoria'),
    check('cedula').custom(existeUsuario),
    check('cedula').custom(usuarioActivo),
    validarCampos, 
],deleteUsuario);

//actualizar datos de usuario 
router.put('/:cedula', [
    AlmenosUnCampo,     
    check('cedula')
        .exists().withMessage("La cédula es obligatoria")
        .isNumeric().withMessage("La cédula debe contener solo números")
        .isLength({min:10, max:10}).withMessage("La cédula debe contener 10 dígitos"),
    check('nombre')
        .optional({nullable: true})
        .isLength({min:3}).withMessage("El nombre debe tener mínimo tres carácteres")
        .matches(/^[A-Za-z\s]+$/).withMessage('El nombre solo debe tener letras'), 
    check('apellido')
        .optional({nullable: true})
        .isLength({min:3}).withMessage("El apellido debe tener mínimo tres carácteres")
        .matches(/^[A-Za-z\s]+$/).withMessage('El nombre solo debe tener letras'),
    check('rol')
        .optional({nullable: true})
        .isIn(['user_web', 'user_app']).withMessage("rol no válido: [user_web, user_app]"), 
    check('cedula').custom(usuarioActivo),   
    check('cedula').custom(existeUsuario), 
    validarCampos,    
    //tamanoContrasena 
],actualizarUsuario);

//Obtener dartos del usuario
router.get('/:cedula',[
    check('cedula')
        .exists().withMessage("La cédula es obligatoria"),
    check('cedula')
        .isNumeric().withMessage("La cédula debe contener solo números"), 
    check('cedula')
        .isLength({min:10, max:10}).withMessage("La cédula debe contener 10 dígitos"),
    check('cedula').custom(existeUsuario), 
    validarCampos
],    
getUsuario)


//buscar usuario 
router.get('',[
    check('nombre')
        .optional({nullable: true})
        .matches(/^[A-Za-z\s]+$/).withMessage('El nombre solo debe tener letras'),
    check('apellido')
        .optional({nullable: true})
        .matches(/^[A-Za-z\s]+$/).withMessage('El nombre solo debe tener letras'),
    validarCampos
],getUsuarios)



export default router; 