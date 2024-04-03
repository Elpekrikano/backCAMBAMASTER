const express = require('express');
const router = express.Router();
const connection = require('../app'); // Importa tu conexión a la base de datos

// Consultar todos los registros de la tabla factura_productos
router.get('/', (req, res) => {
    const query = 'SELECT * FROM factura_productos';
    connection.query(query, (error, resultado) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error en la consulta SQL' });
        }

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json(`No hay registros en la tabla factura_productos`);
        }
    });
});

// Consultar por ID de factura en la tabla factura_productos
router.get('/:id_factura', (req, res) => {
    const { id_factura } = req.params;
    const query = `SELECT * FROM factura_productos WHERE fk_pk_n_factura=${id_factura}`;
    connection.query(query, (error, resultado) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error en la consulta SQL' });
        }

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json('No hay registros asociados a la factura en la tabla factura_productos');
        }
    });
});

// Agregar un nuevo registro a la tabla factura_productos
router.post('/agregar', (req, res) => {
    const nuevoRegistro = req.body;

    const query = 'INSERT INTO factura_productos SET ?';
    connection.query(query, nuevoRegistro, (error) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al insertar en la tabla factura_productos' });
        }

        res.json('Se insertó correctamente el registro en la tabla factura_productos');
    });
});

// Actualizar un registro en la tabla factura_productos
router.put('/actualizar/:id_factura', (req, res) => {
    const { id_factura } = req.params;
    const nuevosDatos = req.body;

    const query = `UPDATE factura_productos SET ? WHERE fk_pk_n_factura=${id_factura}`;
    connection.query(query, nuevosDatos, (error) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al actualizar en la tabla factura_productos' });
        }

        res.json('Se actualizó correctamente el registro en la tabla factura_productos');
    });
});

// Borrar registros de la tabla factura_productos asociados a una factura
router.delete('/borrar/:id_factura', (req, res) => {
    const { id_factura } = req.params;

    const query = `DELETE FROM factura_productos WHERE fk_pk_n_factura=${id_factura}`;
    connection.query(query, (error) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al eliminar en la tabla factura_productos' });
        }

        res.json('Se eliminaron correctamente los registros asociados a la factura en la tabla factura_productos');
    });
});

module.exports = router;
