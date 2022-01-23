import { Router } from 'express';
import { getCategorias, getCategoria, postCategoria, deleteCategoria, putCategoria } from '../controllers/categoria.controller';
import { check } from 'express-validator';
import { validarCampos} from '../middlewares/validar_campos';
import { existeCategoriaNombre, existeCategoriaID } from '../db/categoria_validators.db';
import { CamposValidosBody } from '../middlewares/validar_campos_categoria';

const router = Router(); 

//Obtener todas las categorias 
router.get('/busqueda',getCategorias);

//Buscar categoria por nombre
router.get('/:nombre',[
    check('nombre')
    .matches(/^[A-Za-z\s]+$/).withMessage("El nombre solo debe contener letras"), 
    validarCampos    
],    
getCategoria);

//crear categoria
router.post('',[
    check('nombre')
    .exists().withMessage("El nombre es obligatorio")
    .matches(/^[A-Za-z\s]+$/).withMessage("El nombre solo debe contener letras"),
    check('nombre').custom(existeCategoriaNombre),
    validarCampos
] ,postCategoria)

//Eliminar categoria
router.delete('/:id',[
    check('id')
        .exists().withMessage("El id es obligatorio")
        .isUUID().withMessage("El id no es válido"),
    check('id').custom(existeCategoriaID), 
    validarCampos    
], deleteCategoria)

//actualizar categoria
router.put('/:id', [
    check('id')
        .exists().withMessage("El id es obligatorio")
        .isUUID().withMessage("El id no es válido")
        .isLength({min:36, max:36}).withMessage("El id no es válido"),
    check('nombre')
        .optional({nullable: true})
        .isLength({min:3}).withMessage("El nombre debe tener mínimo tres carácteres")
        .matches(/^[A-Za-z\s]+$/).withMessage('El nombre solo debe tener letras'), 
    check('id').custom(existeCategoriaID),
    check('nombre').custom(existeCategoriaNombre),  
    validarCampos,   
    CamposValidosBody
], putCategoria)



export default router; 