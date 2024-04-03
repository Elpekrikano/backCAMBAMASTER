const express = require('express');
const router = express.Router();
const connection = require('../app');
const multer = require('multer');

// Configuración de Multer para manejar la carga de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assetsproducts/'); // Directorio donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Agregar un nuevo registro a la tabla productos
router.post('/upload', upload.array('productImage', 5), (req, res) => {
    const { productName, productDescription, productPrice } = req.body;
    const productImages = req.files.map(file => file.path); // Obtener las rutas de las imágenes

    // Verificar si se han proporcionado todos los datos necesarios
    if (!productName || !productDescription || !productPrice || !productImages) {
        return res.status(400).json({ error: 'Faltan datos del producto' });
    }

    const newProduct = {
        title: productName,
        description: productDescription,
        price: productPrice,
        images: productImages // Guardar las rutas de las imágenes en tu base de datos
    };

    const query = 'INSERT INTO productos SET ?';
    connection.query(query, newProduct, (error) => {
        if (error) {
            console.error(error.message);
            return res.status(500).json({ error: 'Error al insertar en la tabla productos' });
        }

        res.json('Producto agregado correctamente');
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
