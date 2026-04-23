const request = require("supertest");
const express = require("express");

jest.mock("../src/jdr/service/CocheService", () => ({
    consultarCochesPorMarca: jest.fn(),
    crearNuevoCoche: jest.fn(),
}));

const cocheService = require("../src/jdr/service/CocheService");
const cocheRoutes = require("../src/jdr/routes/cocheRoutes");

const app = express();
app.use(express.json());
app.use("/", cocheRoutes);

describe("consultarCochesPorMarca", () => {
    it("Caso 1 - Marca existente: 'Seat' → lista con 3 coches", async () => {
        cocheService.consultarCochesPorMarca.mockResolvedValue([
            {
                identificador: 2,
                marca: "Seat",
                modelo: "León",
                cilindrada: 1600,
            },
            {
                identificador: 4,
                marca: "Seat",
                modelo: "Clio",
                cilindrada: 1400,
            },
            {
                identificador: 5,
                marca: "Seat",
                modelo: "Ibiza",
                cilindrada: 1400,
            },
        ]);

        const res = await request(app).get("/coches?marca=Seat");

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body).toHaveLength(3);
        expect(res.body.every((c) => c.marca === "Seat")).toBe(true);
    });

    it("Caso 2 - Marca inexistente: 'Ferrari' → lista vacía", async () => {
        cocheService.consultarCochesPorMarca.mockResolvedValue([]);

        const res = await request(app).get("/coches?marca=Ferrari");

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body).toHaveLength(0);
    });
});

describe("crearNuevoCoche", () => {
    it("Caso 1 - Cilindrada nula → error 400", async () => {
        const res = await request(app)
            .post("/coches")
            .send({ marca: "Seat", modelo: "Ibiza", cilindrada: null });

        expect(res.statusCode).toEqual(400);
    });

    it("Caso 2a - Cilindrada = 0 → error 400", async () => {
        const res = await request(app)
            .post("/coches")
            .send({ marca: "Seat", modelo: "Ibiza", cilindrada: 0 });

        expect(res.statusCode).toEqual(400);
    });

    it("Caso 2b - Cilindrada negativa (-1200) → error 400", async () => {
        const res = await request(app)
            .post("/coches")
            .send({ marca: "Seat", modelo: "Ibiza", cilindrada: -1200 });

        expect(res.statusCode).toEqual(400);
    });

    it("Caso 3 - Datos válidos → coche creado con status 201", async () => {
        cocheService.crearNuevoCoche.mockResolvedValue({
            identificador: 8,
            marca: "Volkswagen",
            modelo: "Golf",
            cilindrada: 2000,
        });

        const res = await request(app)
            .post("/coches")
            .send({ marca: "Volkswagen", modelo: "Golf", cilindrada: 2000 });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("identificador");
        expect(res.body.marca).toBe("Volkswagen");
        expect(res.body.modelo).toBe("Golf");
        expect(res.body.cilindrada).toBe(2000);
    });
});
