const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const connection = require('../app'); // Importa la conexión compatible con promesas
const { tokenSign } = require('./generateToken');
const cors = require('cors');

router.use(cors());

router.get('/', (req, res) => {
    res.status(405).json({ error: 'No se permite el método GET en esta ruta' });
});

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    console.log('Datos recibidos:', email, password);

    try {
        console.log('====================================');
        console.log("DEntro del try");
        console.log('====================================');

        // Ejecutar la consulta SQL
        connection.query('SELECT * FROM usuarios WHERE email = ?', [email], (error, results, fields) => {
            if (error) {
                console.error('Error en la consulta SQL:', error);
                return res.status(500).json({ error: 'Error en el servidor' });
            }

            if (!results || results.length === 0) {
                console.log('====================================');
                console.log("Primer if");
                console.log('====================================');
                return res.status(401).json({ error: 'Correo electrónico o contraseña incorrectos' });
            }

            console.log('====================================');
            console.log("Despues del primer if");
            console.log('====================================');

            const usuario = results[0];

            console.log('====================================');
            console.log("Datos primera clave: ", password, " Dato de segunda clave: ", usuario.password);
            console.log('====================================');

            bcrypt.compare(password, usuario.password, (err, passwordMatch) => {
                if (err) {
                    console.error('Error al comparar contraseñas:', err);
                    return res.status(500).json({ error: 'Error en el servidor' });
                }

                if (!passwordMatch) {
                    console.log('====================================');
                    console.log("Dentro del segundo if");
                    console.log('====================================');
                    return res.status(401).json({ error: 'Correo electrónico o contraseña incorrectos' });
                }

                const tokenSession = tokenSign(usuario);
                res.json(tokenSession);
            });
        });
    } catch (error) {
        console.log('====================================');
        console.log("Dentro del catch del try");
        console.log('====================================');
        console.error('Error en la consulta SQL:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

module.exports = router;