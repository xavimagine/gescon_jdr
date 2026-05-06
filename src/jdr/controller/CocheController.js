const cocheService = require("../service/CocheService");

class CocheController {
    async getCochesPorMarca(req, res) {
        try {
            const { marca } = req.query;

            if (!marca) {
                return res.status(400).json({
                    error: 'El parámetro "marca" es obligatorio',
                });
            }

            const coches = await cocheService.consultarCochesPorMarca(marca);
            return res.status(200).json(coches);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async addCoche(req, res) {
        try {
            const { marca, modelo, cilindrada } = req.body;

            if (
                !marca ||
                !modelo ||
                cilindrada === null ||
                cilindrada === undefined
            ) {
                return res.status(400).json({
                    error: "Los campos marca, modelo y cilindrada son obligatorios",
                });
            }
            if (cilindrada <= 0) {
                return res.status(400).json({
                    error: "La cilindrada debe ser mayor que 0",
                });
            }

            const nuevoCoche = await cocheService.crearNuevoCoche({
                marca,
                modelo,
                cilindrada,
            });
            return res.status(201).json(nuevoCoche);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new CocheController();
