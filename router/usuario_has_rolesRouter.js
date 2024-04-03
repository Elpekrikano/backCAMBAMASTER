const express = require('express');
const router = express.Router();
const connection = require('../app');

// Consultar todos los registros de la tabla usuario_has_roles
router.get('/', (req, res) => {
    const query = 'SELECT * FROM usuario_has_roles';
    connection.query(query, (error, resultado) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error en la consulta SQL' });
        }

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json(`No hay registros en la tabla usuario_has_roles`);
        }
    });
});

// Consultar por tipo de documento, ID de usuario y rol en la tabla usuario_has_roles
router.get('/:usuario_tdoc/:usuario_id/:usuario_rol', (req, res) => {
    const { usuario_tdoc, usuario_id, usuario_rol } = req.params;
    const query = `SELECT * FROM usuario_has_roles WHERE usuario_tdoc='${usuario_tdoc}' AND usuario_id='${usuario_id}' AND usuario_rol='${usuario_rol}'`;
    connection.query(query, (error, resultado) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error en la consulta SQL' });
        }

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json('No hay registros asociados al usuario y rol en la tabla usuario_has_roles');
        }
    });
});

// Agregar un nuevo registro a la tabla usuario_has_roles
router.post('/agregar', (req, res) => {
    const nuevoRegistro = req.body;

    const query = 'INSERT INTO usuario_has_roles SET ?';
    connection.query(query, nuevoRegistro, (error) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al insertar en la tabla usuario_has_roles' });
        }

        res.json('Se insertó correctamente el registro en la tabla usuario_has_roles');
    });
});

// Borrar un registro de la tabla usuario_has_roles por tipo de documento, ID de usuario y rol
router.delete('/borrar/:usuario_tdoc/:usuario_id/:usuario_rol', (req, res) => {
    const { usuario_tdoc, usuario_id, usuario_rol } = req.params;

    const query = `DELETE FROM usuario_has_roles WHERE usuario_tdoc='${usuario_tdoc}' AND usuario_id='${usuario_id}' AND usuario_rol='${usuario_rol}'`;
    connection.query(query, (error) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al eliminar en la tabla usuario_has_roles' });
        }

        res.json('Se eliminó correctamente el registro en la tabla usuario_has_roles');
    });
});

module.exports = router;
