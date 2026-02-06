import type { IRentalRepository } from "../../../domain/repositories/IRentalRepository.js";
import { Rental } from "../../../domain/entities/Rental.js";

export class InMemoryRentalRepository implements IRentalRepository {
  private rentals: Rental[] = [];

  async create(data: Rental): Promise<Rental> {
    const rental = new (Rental as any)(
      data.userId,
      data.carId,
      data.expectedReturnDate,
      Math.random().toString(36).substring(7)
    );

    this.rentals.push(rental);
    return rental;
  }

  async findOpenRentalByCar(carId: string): Promise<Rental | null> {
    return this.rentals.find(
      (rental) => rental.carId === carId && !rental.endDate
    ) || null;
  }

  async findOpenRentalByUser(userId: string): Promise<Rental | null> {
    return this.rentals.find(
      (rental) => rental.userId === userId && !rental.endDate
    ) || null;
  }
}