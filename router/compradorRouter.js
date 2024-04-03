const express = require('express');
const router = express.Router();
const connection = require('../app'); // Importa tu conexión a la base de datos

// Consultar todos los registros de la tabla comprador
router.get('/', (req, res) => {
    const query = 'SELECT * FROM comprador';
    connection.query(query, (error, resultado) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error en la consulta SQL' });
        }

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json(`No hay registros en la tabla comprador`);
        }
    });
});

// Consultar por ID en la tabla comprador
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM comprador WHERE id_comprador=${id}`;
    connection.query(query, (error, resultado) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error en la consulta SQL' });
        }

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json('El ID no corresponde a ningún registro en la tabla comprador');
        }
    });
});

// Agregar un nuevo registro a la tabla comprador
router.post('/agregar', (req, res) => {
    const nuevoRegistro = req.body;

    const query = 'INSERT INTO comprador SET ?';
    connection.query(query, nuevoRegistro, (error) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al insertar en la tabla comprador' });
        }

        res.json('Se insertó correctamente el registro en la tabla comprador');
    });
});

// Actualizar un registro en la tabla comprador
router.put('/actualizar/:id', (req, res) => {
    const { id } = req.params;
    const nuevosDatos = req.body;

    const query = `UPDATE comprador SET ? WHERE id_comprador=${id}`;
    connection.query(query, nuevosDatos, (error) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al actualizar en la tabla comprador' });
        }

        res.json('Se actualizó correctamente el registro en la tabla comprador');
    });
});

// Borrar un registro de la tabla comprador
router.delete('/borrar/:id', (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM comprador WHERE id_comprador=${id}`;
    connection.query(query, (error) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al eliminar en la tabla comprador' });
        }

        res.json('Se eliminó correctamente el registro en la tabla comprador');
    });
});

module.exports = router;
