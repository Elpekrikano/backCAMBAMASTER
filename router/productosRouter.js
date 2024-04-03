const express = require('express');
const router = express.Router();
const connection = require('../app'); // Importa tu conexión a la base de datos

// Consultar todos los registros de la tabla productos
router.get('/', (req, res) => {
    const query = 'SELECT * FROM productos';
    connection.query(query, (error, resultado) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error en la consulta SQL' });
        }

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json(`No hay registros en la tabla productos`);
        }
    });
});

// Consultar por código de producto en la tabla productos
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM productos WHERE cod_producto='${id}'`;
    connection.query(query, (error, resultado) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error en la consulta SQL' });
        }

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json('No hay registros asociados al código de producto en la tabla productos');
        }
    });
});

// Agregar un nuevo registro a la tabla productos
router.post('/agregar', (req, res) => {
    const nuevoRegistro = req.body;

    const query = 'INSERT INTO productos SET ?';
    connection.query(query, nuevoRegistro, (error) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al insertar en la tabla productos' });
        }

        res.json('Se insertó correctamente el registro en la tabla productos');
    });
});

// Actualizar un registro en la tabla productos
router.put('/actualizar/:id', (req, res) => {
    const { id } = req.params;
    const nuevosDatos = req.body;

    const query = `UPDATE productos SET ? WHERE cod_producto='${id}'`;
    connection.query(query, nuevosDatos, (error) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al actualizar en la tabla productos' });
        }

        res.json('Se actualizó correctamente el registro en la tabla productos');
    });
});

// Borrar un registro de la tabla productos por código de producto
router.delete('/borrar/:id', (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM productos WHERE cod_producto='${id}'`;
    connection.query(query, (error) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al eliminar en la tabla productos' });
        }

        res.json('Se eliminó correctamente el registro en la tabla productos');
    });
});

module.exports = router;
