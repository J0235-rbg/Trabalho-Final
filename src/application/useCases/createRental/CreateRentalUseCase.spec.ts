import { describe, it, expect, beforeEach } from "vitest";
import { CreateRentalUseCase } from "./CreateRentalUseCase.js";
import { InMemoryRentalRepository } from "../../../infra/database/inMemory/InMemoryRentalRepository.js";
import { InMemoryCarRepository } from "../../../infra/database/inMemory/InMemoryCarRepository.js";
import { Car } from "../../../domain/entities/Car.js";

describe("Criação Aluguel", () => {
  let carRepository: InMemoryCarRepository;
  let rentalRepository: InMemoryRentalRepository;
  let createRentalUseCase: CreateRentalUseCase;

  beforeEach(() => {
    carRepository = new InMemoryCarRepository();
    rentalRepository = new InMemoryRentalRepository();
    createRentalUseCase = new CreateRentalUseCase(carRepository, rentalRepository);
  });

  it("deve criar um novo aluguel", async () => {
    const car = new Car("Fusca", "ABC-1234", "carro-id-1", true);
    carRepository.cars.push(car);

    const rental = await createRentalUseCase.execute({
      userId: "usuario-id-123",
      carId: "carro-id-1",
      expectedReturnDate: new Date(Date.now() + 25 * 60 * 60 * 1000), 
    });

    expect(rental).toHaveProperty("id");
    expect(car.available).toBe(false); 
  });

  it("não deve ser permitido criar um aluguel com menos de 24hrs", async () => {
    const car = new Car("Civic", "XYZ-9374",  "carro-id-2", true);
    carRepository.cars.push(car);

    await expect(
      createRentalUseCase.execute({
        userId: "usuario-id-123",
        carId: "carro-id-2",
        expectedReturnDate: new Date(), 
      })
    ).rejects.toThrow("Aluguel deve ter no mínimo 24 horas de duração");
  });

  it("não deve ser permitido alugar um carro indisponível", async () => {
    const car = new Car("Civic", "XYZ-9374", "carro-id-3", false); 
    carRepository.cars.push(car);

    await expect(
      createRentalUseCase.execute({
        userId: "usuario-id-123",
        carId: "carro-id-3",
        expectedReturnDate: new Date(Date.now() + 30 * 60 * 60 * 1000),
      })
    ).rejects.toThrow("O carro está indisponível");
  });
});