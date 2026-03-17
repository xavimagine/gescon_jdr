const cocheRepository = require('../repository/CocheRepository');

class CocheService {

    async consultarCochesPorMarca(marca) {
        if (!marca) {
            throw new Error('El parámetro marca es obligatorio');
        }
        return await cocheRepository.findByMarca(marca);
    }

    async crearNuevoCoche(coche) {
        if (!coche.marca || !coche.modelo || !coche.cilindrada) {
            throw new Error('Los campos marca, modelo y cilindrada son obligatorios');
        }
        return await cocheRepository.save(coche);
    }
}

module.exports = new CocheService();
