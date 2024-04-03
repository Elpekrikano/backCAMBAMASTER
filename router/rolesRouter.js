const express = require('express');
const router = express.Router();
const connection = require('../app'); // Importa tu conexión a la base de datos

// Consultar todos los registros de la tabla roles
router.get('/', (req, res) => {
    const query = 'SELECT * FROM roles';
    connection.query(query, (error, resultado) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error en la consulta SQL' });
        }

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json(`No hay registros en la tabla roles`);
        }
    });
});

// Consultar por código de rol en la tabla roles
router.get('/:cod_rol', (req, res) => {
    const { cod_rol } = req.params;
    const query = `SELECT * FROM roles WHERE cod_rol='${cod_rol}'`;
    connection.query(query, (error, resultado) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error en la consulta SQL' });
        }

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json('No hay registros asociados al código de rol en la tabla roles');
        }
    });
});

// Agregar un nuevo registro a la tabla roles
router.post('/agregar', (req, res) => {
    const nuevoRegistro = req.body;

    const query = 'INSERT INTO roles SET ?';
    connection.query(query, nuevoRegistro, (error) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al insertar en la tabla roles' });
        }

        res.json('Se insertó correctamente el registro en la tabla roles');
    });
});

// Actualizar un registro en la tabla roles
router.put('/actualizar/:cod_rol', (req, res) => {
    const { cod_rol } = req.params;
    const nuevosDatos = req.body;

    const query = `UPDATE roles SET ? WHERE cod_rol='${cod_rol}'`;
    connection.query(query, nuevosDatos, (error) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al actualizar en la tabla roles' });
        }

        res.json('Se actualizó correctamente el registro en la tabla roles');
    });
});

// Borrar un registro de la tabla roles por código de rol
router.delete('/borrar/:cod_rol', (req, res) => {
    const { cod_rol } = req.params;

    const query = `DELETE FROM roles WHERE cod_rol='${cod_rol}'`;
    connection.query(query, (error) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al eliminar en la tabla roles' });
        }

        res.json('Se eliminó correctamente el registro en la tabla roles');
    });
});

module.exports = router;
