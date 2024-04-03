const { verifyToken } = require('../routers/generateToken')
const express = require('express');
const conexion = require('../conexion');

const roleAuth = (roles) => async (req, res, next) => {
    try {
        console.log(req.headers.authorization);
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return res.status(401).send({ error: 'Falta el encabezado de autorización' });
        }

        const token = req.headers.authorization.split(' ').pop()
        const tokenData = await verifyToken(token)

        const userData = `SELECT * FROM usuarios WHERE id_usuario=${tokenData.id_usuario};`
        conexion.query(userData, (error, resultado) => {
            if (error) return console.error(error.message)

            if ([].concat(roles).includes(resultado[0].Rol_IdRol)) {
                next()
            } else {
                return res.status(409).send({ error: 'Permisos Fuera De Alcance' });
            }
        })

    } catch (e) {
        console.log(e)
        return res.status(409).send({ error: 'Prohibido el paso, De aqui no pasas!' });
    }
}

module.exports = roleAuth;
