const express = require('express');
const router = express.Router();
const connection = require('../app');

// Consultar todos los registros de la tabla vendedor
router.get('/', (req, res) => {
    const query = 'SELECT * FROM vendedor';
    connection.query(query, (error, resultado) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error en la consulta SQL' });
        }

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json(`No hay registros en la tabla vendedor`);
        }
    });
});

// Consultar por tipo de documento y ID de vendedor en la tabla vendedor
router.get('/:tdoc_vendedor/:id_vendedor', (req, res) => {
    const { tdoc_vendedor, id_vendedor } = req.params;
    const query = `SELECT * FROM vendedor WHERE tdoc_vendedor='${tdoc_vendedor}' AND id_vendedor='${id_vendedor}'`;
    connection.query(query, (error, resultado) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error en la consulta SQL' });
        }

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json('No hay registros asociados al tipo de documento y ID de vendedor en la tabla vendedor');
        }
    });
});

// Agregar un nuevo registro a la tabla vendedor
router.post('/agregar', (req, res) => {
    const nuevoRegistro = req.body;

    const query = 'INSERT INTO vendedor SET ?';
    connection.query(query, nuevoRegistro, (error) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al insertar en la tabla vendedor' });
        }

        res.json('Se insertó correctamente el registro en la tabla vendedor');
    });
});

// Borrar un registro de la tabla vendedor por tipo de documento y ID de vendedor
router.delete('/borrar/:tdoc_vendedor/:id_vendedor', (req, res) => {
    const { tdoc_vendedor, id_vendedor } = req.params;

    const query = `DELETE FROM vendedor WHERE tdoc_vendedor='${tdoc_vendedor}' AND id_vendedor='${id_vendedor}'`;
    connection.query(query, (error) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al eliminar en la tabla vendedor' });
        }

        res.json('Se eliminó correctamente el registro en la tabla vendedor');
    });
});

module.exports = router;
