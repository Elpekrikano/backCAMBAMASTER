const express = require('express');
const router = express.Router();
const connection = require('../app');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Consultar el usuario por correo electrónico
    const query = `SELECT * FROM usuarios WHERE email='${email}'`;
    connection.query(query, async (error, results) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error en la consulta SQL' });
        }

        // Verificar si se encontró un usuario con el correo electrónico proporcionado
        if (results.length === 0) {
            return res.status(401).json({ error: 'Correo electrónico o contraseña incorrectos' });
        }

        // Verificar la contraseña
        const usuario = results[0];
        const passwordMatch = await bcrypt.compare(password, usuario.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Correo electrónico o contraseña incorrectos' });
        }

        // Generar token JWT
        const token = jwt.sign({ id_usuario: usuario.id_usuario }, 'secreto', { expiresIn: '1h' });

        // Devolver el token como respuesta
        res.json({ token });
    });
});

// Consultar todos los registros de la tabla usuarios
router.get('/', (req, res) => {
    const query = 'SELECT * FROM usuarios';
    connection.query(query, (error, resultado) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error en la consulta SQL' });
        }

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json(`No hay registros en la tabla usuarios`);
        }
    });
});

// Consultar por ID de usuario en la tabla usuarios
router.get('/:id_usuario', (req, res) => {
    const { id_usuario } = req.params;
    const query = `SELECT * FROM usuarios WHERE id_usuario='${id_usuario}'`;
    connection.query(query, (error, resultado) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error en la consulta SQL' });
        }

        if (resultado.length > 0) {
            res.json(resultado);
        } else {
            res.json('No hay registros asociados al ID de usuario en la tabla usuarios');
        }
    });
});

// Agregar un nuevo registro a la tabla usuarios
router.post('/agregar', async (req, res) => {
    const nuevoUsuario = req.body;

    // Encriptar la contraseña antes de guardarla en la base de datos
    const salt = await bcrypt.genSalt(10);
    nuevoUsuario.password = await bcrypt.hash(nuevoUsuario.password, salt);

    const query = 'INSERT INTO usuarios SET ?';
    connection.query(query, nuevoUsuario, (error) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al insertar en la tabla usuarios' });
        }

        res.json('Se insertó correctamente el registro en la tabla usuarios');
    });
});

// Actualizar un registro en la tabla usuarios
router.put('/actualizar/:id_usuario', async (req, res) => {
    const { id_usuario } = req.params;
    const nuevosDatos = req.body;

    // Si se está actualizando la contraseña, encriptarla antes de guardarla en la base de datos
    if (nuevosDatos.password) {
        const salt = await bcrypt.genSalt(10);
        nuevosDatos.password = await bcrypt.hash(nuevosDatos.password, salt);
    }

    const query = `UPDATE usuarios SET ? WHERE id_usuario='${id_usuario}'`;
    connection.query(query, nuevosDatos, (error) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al actualizar en la tabla usuarios' });
        }

        res.json('Se actualizó correctamente el registro en la tabla usuarios');
    });
});

// Borrar un registro de la tabla usuarios por ID de usuario
router.delete('/borrar/:id_usuario', (req, res) => {
    const { id_usuario } = req.params;

    const query = `DELETE FROM usuarios WHERE id_usuario='${id_usuario}'`;
    connection.query(query, (error) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al eliminar en la tabla usuarios' });
        }

        res.json('Se eliminó correctamente el registro en la tabla usuarios');
    });
});

module.exports = router;
