const express = require('express');
const router = express.Router();
const connection = require('../app'); 

// Consultar todos los registros de la tabla factura
router.get('/', (req, res) => {
    const query = 'SELECT * FROM factura';
    connection.query(query, (error, resultado) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error en la consulta SQL' });
        }

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json(`No hay registros en la tabla factura`);
        }
    });
});

// Consultar por número de factura en la tabla factura
router.get('/:n_factura', (req, res) => {
    const { n_factura } = req.params;
    const query = `SELECT * FROM factura WHERE n_factura='${n_factura}'`;
    connection.query(query, (error, resultado) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error en la consulta SQL' });
        }

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json('No hay registros asociados al número de factura en la tabla factura');
        }
    });
});

// Agregar un nuevo registro a la tabla factura
router.post('/agregar', (req, res) => {
    const nuevoRegistro = req.body;

    const query = 'INSERT INTO factura SET ?';
    connection.query(query, nuevoRegistro, (error) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al insertar en la tabla factura' });
        }

        res.json('Se insertó correctamente el registro en la tabla factura');
    });
});

// Actualizar un registro en la tabla factura
router.put('/actualizar/:n_factura', (req, res) => {
    const { n_factura } = req.params;
    const nuevosDatos = req.body;

    const query = `UPDATE factura SET ? WHERE n_factura='${n_factura}'`;
    connection.query(query, nuevosDatos, (error) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al actualizar en la tabla factura' });
        }

        res.json('Se actualizó correctamente el registro en la tabla factura');
    });
});

// Borrar un registro de la tabla factura por número de factura
router.delete('/borrar/:n_factura', (req, res) => {
    const { n_factura } = req.params;

    const query = `DELETE FROM factura WHERE n_factura='${n_factura}'`;
    connection.query(query, (error) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al eliminar en la tabla factura' });
        }

        res.json('Se eliminó correctamente el registro en la tabla factura');
    });
});

module.exports = router;
