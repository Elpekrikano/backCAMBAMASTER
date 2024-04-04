const express = require('express');
const mysql = require('mysql2');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'roundhouse.proxy.rlwy.net',
  user: 'root',
  password: 'iEktBmKlPCWPOgoTZsVAekEuoaiiyWZs',
  database: 'railway',
  port: 46384
});

// Conexión a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1); // Detener la ejecución del servidor en caso de error
  }
  console.log('Conexión a la base de datos establecida');
});

// Exporta la conexión para que pueda ser utilizada en otros archivos
module.exports = connection;