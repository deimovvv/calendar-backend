
/* Event Routes
    /api/events
*/


const {Router} = require('express')

const { validarJWT } = require('../middlewares/validar-jwt')
const { check } = require('express-validator')
const { validarCampos} = require('../middlewares/validar-campos')
const { getEvento, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events')
const isDate = require('../helpers/isDate')

const router = Router();

// Todas tienen que pasar por la validacion del JWT
router.use( validarJWT );

// Obtener eventos 
router.get('/',getEvento)

// Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'el titulo es obligatorio').not().isEmpty(),
        check('start', 'fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'fecha de finalizacion es obligatoria').custom( isDate ),
        validarCampos
    ],
crearEvento)

// Actualizar Evento
router.put('/:id',actualizarEvento)

// Borrar evento
router.delete('/:id',eliminarEvento)


module.exports = router;


