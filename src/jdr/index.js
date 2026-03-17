const express = require("express");
require("dotenv").config();

const cocheRoutes = require("./routes/cocheRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Rutas
app.use("/api", cocheRoutes);

// Ruta raíz
app.get("/", (req, res) => {
    res.json({
        message: "API REST - Sistema Gestión Concesionario",
        endpoints: {
            "GET /api/coches?marca=Toyota": "Consultar coches por marca",
            "POST /api/coches": "Registrar nuevo coche",
        },
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
