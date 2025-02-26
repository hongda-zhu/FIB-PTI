const express = require('express');
const fs = require('fs');
const app = express();
const port = 8080;

const filepath = 'rentals.json';

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Datos por defecto para rentals.json
const defaultRentals = {
    "rentals": [
        {
            "engine": "Hybrid",
            "num_vehi": "1",
            "descuento": "12",
            "dias_alquiler": "1"
        },
        {
            "engine": "Electric",
            "num_vehi": "2",
            "descuento": "23",
            "dias_alquiler": "3"
        }
    ]
};

// Verificar si el archivo existe, si no, crear con datos por defecto
if (!fs.existsSync(filepath)) {
    fs.writeFileSync(filepath, JSON.stringify(defaultRentals));
}

// 1) Endpoint para procesar el formulario (post)
app.post('/new', (req, res) => {
    const rentalsFileRawData = fs.readFileSync(filepath);
    const rentalsJSON = JSON.parse(rentalsFileRawData);

    // Mapear los campos del formulario a la estructura deseada
    const newRental = {
        engine: req.body.sub_model_vehicle,
        num_vehi: req.body.num_vehicles,
        descuento: req.body.descompte,
        dias_alquiler: req.body.dies_lloguer
    };

    // Agregar el nuevo alquiler
    rentalsJSON.rentals.push(newRental);

    // Guardar en el archivo
    fs.writeFileSync(filepath, JSON.stringify(rentalsJSON));

    res.status(201).send('Rental added successfully!');
});

// 2) Endpoint para listar todos los alquileres
app.get('/rentals', (req, res) => {
    const rentalsFileRawData = fs.readFileSync(filepath);
    const rentalsJSON = JSON.parse(rentalsFileRawData);
    res.json(rentalsJSON);
});

// Servir archivos estáticos (HTML)
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Car Rental API listening at http://localhost:${port}`);
});

/* 
Endpoint 1:
curl -X POST -H "Content-Type: application/json" -d '{
    "sub_model_vehicle":"Hybrid",
    "num_vehicles":"1",
    "descompte":"10",
    "dies_lloguer":"2"
}' http://localhost:8080/new

Endpoint 2:
curl http://localhost:8080/rentals
*/