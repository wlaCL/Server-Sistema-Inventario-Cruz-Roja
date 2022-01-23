"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var producto_controller_1 = require("../controllers/producto.controller");
var express_validator_1 = require("express-validator");
var validar_campos_1 = require("../middlewares/validar_campos");
var categoria_validators_db_1 = require("../db/categoria_validators.db");
var producto_validators_db_1 = require("../db/producto_validators.db");
var validar_campos_productos_1 = require("../middlewares/validar_campos_productos");
var producto_caducidad_controller_1 = require("../controllers/producto_caducidad.controller");
var router = (0, express_1.Router)();
//RUTAS PARA EL PRODUCTO 
//crear producto 
router.post('', [
    (0, express_validator_1.check)('id_categoria')
        .exists().withMessage("El id_categoria es obligatorio")
        .isUUID(4).withMessage("No es un id_válido"),
    (0, express_validator_1.check)('nombre')
        .exists().withMessage("El nombre es obligatorio")
        .matches(/^[A-Za-z\s]+$/).withMessage("No es un nombre válido"),
    (0, express_validator_1.check)('tipo')
        .exists().withMessage("El tipo de producto es obligatorio")
        .isIn(['Insumo Medico', 'Equipo']).withMessage("El tipo de producto no es válido ['Insumo Medico', 'Equipo']"),
    (0, express_validator_1.check)('can_minima')
        .exists().withMessage("La cantidad Minima es obligatoria")
        .isNumeric().withMessage("La cantidad debe ser un número"),
    (0, express_validator_1.check)('medida')
        .optional({ nullable: true })
        .isIn(['caja', 'unidad']).withMessage("El tipo de medida no es válido ['caja', 'unidad']"),
    (0, express_validator_1.check)('cantidad')
        .optional({ nullable: true })
        .isNumeric().withMessage("La cantidad debe ser un número")
        .isInt({ min: 1 }).withMessage("El número debe ser mayor o igual a 1"),
    (0, express_validator_1.check)('id_categoria').custom(categoria_validators_db_1.existeCategoriaID),
    (0, express_validator_1.check)('nombre').custom(producto_validators_db_1.ExisteProductoNombre),
    validar_campos_1.validarCampos,
    validar_campos_productos_1.validarTipoUnidad,
    validar_campos_productos_1.validarCantidadEquipos
], producto_controller_1.postProducto);
//actualizar el producto
router.put('/:id', [
    (0, express_validator_1.check)('id')
        .exists().withMessage("El id es obligatorio")
        .isUUID(4).withMessage("No es un id válido"),
    (0, express_validator_1.check)('nombre')
        .optional({ nullable: true })
        .matches(/^[A-Za-z\s]+$/).withMessage("No es un nombre válido"),
    (0, express_validator_1.check)('can_minima')
        .optional({ nullable: true })
        .isInt({ min: 0 }).withMessage("El número debe ser positivo")
        .isNumeric().withMessage("La cantidad debe ser un número"),
    (0, express_validator_1.check)('id').custom(producto_validators_db_1.ExisteTipoProductoID),
    (0, express_validator_1.check)('nombre').custom(producto_validators_db_1.ExisteProductoNombre),
    validar_campos_1.validarCampos
], producto_controller_1.putProducto);
//obtener el tipo de producto  por id
router.get('/:id', [
    (0, express_validator_1.check)('id')
        .isUUID(4).withMessage("El id no es valido"),
    (0, express_validator_1.check)('id').custom(producto_validators_db_1.ExisteTipoProductoID),
    validar_campos_1.validarCampos
], producto_controller_1.getProducto);
//eliminar producto
router.delete('/:id', [
    (0, express_validator_1.check)('id')
        .isUUID(4).withMessage("El id no es valido"),
    (0, express_validator_1.check)('id').custom(producto_validators_db_1.ExisteTipoProductoID),
    validar_campos_1.validarCampos
], producto_controller_1.deleteProducto);
//consultar todos los productos por nombre
router.get('/busqueda/:termino', [
    (0, express_validator_1.check)('termino')
        .matches(/^[A-Za-z\s]+$/).withMessage("Se necesita un nombre válido"),
    validar_campos_1.validarCampos,
], producto_controller_1.getProductos);
//RUTAS PARA LAS PRODUCTOS CON FECHA DE CADUCIDAD
router.post('/caducidad', [
    (0, express_validator_1.check)('id_tipoprod')
        .exists().withMessage("El id es obligatorio")
        .isUUID(4).withMessage("No es un id válido"),
    (0, express_validator_1.check)('fecha_caducidad')
        .exists().withMessage("La fecha es obligatoria")
        .isDate().withMessage("no es una fecha válida"),
    (0, express_validator_1.check)('cantidad')
        .exists().withMessage("La cantidad es obligatoria")
        .isNumeric().withMessage("La cantidad debe ser un número")
        .isInt({ min: 1 }).withMessage("El número debe ser mayor o igual a 1"),
    (0, express_validator_1.check)('fecha_caducidad').custom(producto_validators_db_1.existeProductoFechaCaducidad),
    (0, express_validator_1.check)('id_tipoprod').custom(producto_validators_db_1.ExisteTipoProductoID),
    (0, express_validator_1.check)('id_tipoprod').custom(producto_validators_db_1.permiteProductoCaducidad),
    validar_campos_1.validarCampos
], producto_caducidad_controller_1.postProductoCaducidad);
router.put('/caducidad/:id', [
    (0, express_validator_1.check)('id')
        .exists().withMessage("El id es obligatorio")
        .isUUID(4).withMessage("No es un id válido"),
    (0, express_validator_1.check)('cantidad')
        .optional({ nullable: true })
        .isNumeric().withMessage("La cantidad debe ser un número")
        .isInt({ min: 1 }).withMessage("El número debe ser mayor o igual a 1"),
    (0, express_validator_1.check)('id').custom(producto_validators_db_1.existeProductoCaducidadID),
    validar_campos_1.validarCampos
], producto_caducidad_controller_1.putProductoCaducidad);
router.delete('/caducidad/:id', [
    (0, express_validator_1.check)('id')
        .exists().withMessage("El id es obligatorio")
        .isUUID(4).withMessage("No es un id válido"),
    (0, express_validator_1.check)('id').custom(producto_validators_db_1.existeProductoCaducidadID),
    validar_campos_1.validarCampos
], producto_caducidad_controller_1.deleteProductoCaducidad);
exports.default = router;
//# sourceMappingURL=producto.route.js.map