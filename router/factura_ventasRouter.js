const express = require('express');
const router = express.Router();
const connection = require('../app'); // Importa tu conexión a la base de datos

// Consultar todos los registros de la tabla factura_ventas
router.get('/', (req, res) => {
    const query = 'SELECT * FROM factura_ventas';
    connection.query(query, (error, resultado) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error en la consulta SQL' });
        }

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json(`No hay registros en la tabla factura_ventas`);
        }
    });
});

// Consultar por número de factura en la tabla factura_ventas
router.get('/:n_factura_vent', (req, res) => {
    const { n_factura_vent } = req.params;
    const query = `SELECT * FROM factura_ventas WHERE n_factura_vent='${n_factura_vent}'`;
    connection.query(query, (error, resultado) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error en la consulta SQL' });
        }

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json('No hay registros asociados al número de factura en la tabla factura_ventas');
        }
    });
});

// Agregar un nuevo registro a la tabla factura_ventas
router.post('/agregar', (req, res) => {
    const nuevoRegistro = req.body;

    const query = 'INSERT INTO factura_ventas SET ?';
    connection.query(query, nuevoRegistro, (error) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al insertar en la tabla factura_ventas' });
        }

        res.json('Se insertó correctamente el registro en la tabla factura_ventas');
    });
});

// Actualizar un registro en la tabla factura_ventas
router.put('/actualizar/:n_factura_vent', (req, res) => {
    const { n_factura_vent } = req.params;
    const nuevosDatos = req.body;

    const query = `UPDATE factura_ventas SET ? WHERE n_factura_vent='${n_factura_vent}'`;
    connection.query(query, nuevosDatos, (error) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al actualizar en la tabla factura_ventas' });
        }

        res.json('Se actualizó correctamente el registro en la tabla factura_ventas');
    });
});

// Borrar un registro de la tabla factura_ventas por número de factura
router.delete('/borrar/:n_factura_vent', (req, res) => {
    const { n_factura_vent } = req.params;

    const query = `DELETE FROM factura_ventas WHERE n_factura_vent='${n_factura_vent}'`;
    connection.query(query, (error) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al eliminar en la tabla factura_ventas' });
        }

        res.json('Se eliminó correctamente el registro en la tabla factura_ventas');
    });
});

module.exports = router;
