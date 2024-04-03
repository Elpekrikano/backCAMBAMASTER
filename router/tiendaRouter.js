const express = require('express');
const router = express.Router();
const connection = require('../app');

// Consultar todos los registros de la tabla tienda
router.get('/', (req, res) => {
    const query = 'SELECT * FROM tienda';
    connection.query(query, (error, resultado) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error en la consulta SQL' });
        }

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json(`No hay registros en la tabla tienda`);
        }
    });
});

// Consultar por ID de tienda en la tabla tienda
router.get('/:id_tienda', (req, res) => {
    const { id_tienda } = req.params;
    const query = `SELECT * FROM tienda WHERE id_tienda='${id_tienda}'`;
    connection.query(query, (error, resultado) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error en la consulta SQL' });
        }

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json('No hay registros asociados al ID de tienda en la tabla tienda');
        }
    });
});

// Agregar un nuevo registro a la tabla tienda
router.post('/agregar', (req, res) => {
    const nuevoRegistro = req.body;

    const query = 'INSERT INTO tienda SET ?';
    connection.query(query, nuevoRegistro, (error) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al insertar en la tabla tienda' });
        }

        res.json('Se insertó correctamente el registro en la tabla tienda');
    });
});

// Actualizar un registro en la tabla tienda
router.put('/actualizar/:id_tienda', (req, res) => {
    const { id_tienda } = req.params;
    const nuevosDatos = req.body;

    const query = `UPDATE tienda SET ? WHERE id_tienda='${id_tienda}'`;
    connection.query(query, nuevosDatos, (error) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al actualizar en la tabla tienda' });
        }

        res.json('Se actualizó correctamente el registro en la tabla tienda');
    });
});

// Borrar un registro de la tabla tienda por ID de tienda
router.delete('/borrar/:id_tienda', (req, res) => {
    const { id_tienda } = req.params;

    const query = `DELETE FROM tienda WHERE id_tienda='${id_tienda}'`;
    connection.query(query, (error) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al eliminar en la tabla tienda' });
        }

        res.json('Se eliminó correctamente el registro en la tabla tienda');
    });
});

module.exports = router;
