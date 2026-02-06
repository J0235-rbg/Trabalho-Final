import type { ICarRepository } from "../../../domain/repositories/ICarRepository.js";
import { Car } from "../../../domain/entities/Car.js";

export class InMemoryCarRepository implements ICarRepository {
  public cars: Car[] = [];

  async findById(id: string): Promise<Car | null> {
    return this.cars.find((car) => car.id === id) || null;
  }

  async findByPlaca(placa: string): Promise<Car | null> {
    return this.cars.find((car) => car.placa === placa ) || null;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const carIndex = this.cars.findIndex((car) => car.id === id);
    if (carIndex !== -1) {
      const car = this.cars[carIndex];
      if (car) {
        car.available = available;
      }
    }
  }
}