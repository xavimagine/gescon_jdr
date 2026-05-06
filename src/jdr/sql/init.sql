CREATE DATABASE IF NOT EXISTS concesionario_jdr;
USE concesionario_jdr;

CREATE TABLE IF NOT EXISTS T_COCHE (
    identificador INT PRIMARY KEY AUTO_INCREMENT,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    cilindrada int NOT NULL,
    CONSTRAINT CHK_CILINDRADA_POSITIVA CHECK (cilindrada > 0)
);

INSERT INTO T_COCHE (identificador, marca, modelo, cilindrada) VALUES
  (1,'Renault', 'Megane', 1500),
  (2,'Seat', 'León', 1600),
  (3,'Suzuki', 'Vitara', 1900),
  (4,'Seat', 'Clio', 1400),
  (5,'Seat', 'Ibiza', 1400),
  (6,'Peugeot', '308', 2000),
  (7,'Renault', 'Megane', 1500)
ON DUPLICATE KEY UPDATE
  marca = VALUES(marca),
  modelo = VALUES(modelo),
  cilindrada = VALUES(cilindrada);