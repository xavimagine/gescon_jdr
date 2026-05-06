const pool = require("../config/db");
const Coche = require("../model/Coche");

class CocheRepository {
  async findByMarca(marca) {
    const [rows] = await pool.query("SELECT * FROM T_COCHE WHERE marca = ?", [
      marca,
    ]);
    return rows.map(
      (row) =>
        new Coche(row.identificador, row.marca, row.modelo, row.cilindrada),
    );
  }

  async save(coche) {
    const { marca, modelo, cilindrada } = coche;

    if (!marca || !modelo || !cilindrada) {
      throw new Error("Los campos marca, modelo y cilindrada son obligatorios");
    }

    const [result] = await pool.query(
      "INSERT INTO T_COCHE (marca, modelo, cilindrada) VALUES (?, ?, ?)",
      [marca, modelo, cilindrada],
    );

    return new Coche(result.insertId, marca, modelo, cilindrada);
  }
}

module.exports = new CocheRepository();
