const express = require('express');
const fs = require('fs');
const app = express();
const port = 8000;

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

// Endpoint para procesar el formulario (GET)
app.get('/new', (req, res) => {
    const rentalsFileRawData = fs.readFileSync(filepath);
    const rentalsJSON = JSON.parse(rentalsFileRawData);

    // Mapear los campos del formulario a la estructura deseada
    const newRental = {
        engine: req.query.sub_model_vehicle,
        num_vehi: req.query.num_vehicles,
        descuento: req.query.descompte,
        dias_alquiler: req.query.dies_lloguer
    };

    // Agregar el nuevo alquiler
    rentalsJSON.rentals.push(newRental);

    // Guardar en el archivo
    fs.writeFileSync(filepath, JSON.stringify(rentalsJSON));

    res.status(201).send('Rental added successfully!');
});

// Endpoint para listar todos los alquileres
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

// endpoint 1:  curl http://localhost:8000/rentals
// endpoint 2:  curl "http://localhost:8000/new?sub_model_vehicle=Hybrid&num_vehicles=1&descompte=10&dies_lloguer=2"