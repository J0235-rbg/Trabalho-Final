import { inject, injectable } from "inversify";
import { TYPES } from "../../../infra/container/types.js";
import type { ICarRepository } from "../../../domain/repositories/ICarRepository.js";
import type { IRentalRepository } from "../../../domain/repositories/IRentalRepository.js";
import { Rental } from "../../../domain/entities/Rental.js";

interface IRequest {
    userId: string;
    carId: string;
    expectedReturnDate: Date;
}

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject(TYPES.ICarRepository)
    private carRepository: ICarRepository,
    @inject(TYPES.IRentalRepository)
    private rentalRepository: IRentalRepository
  ) {}

  async execute({ userId, carId, expectedReturnDate }: IRequest): Promise<Rental> {
    const minimumHour = 24;

    const car = await this.carRepository.findById(carId);
    if (!car || !car.available) {
      throw new Error("Carro não está disponível");
    }

    const userHasRental = await this.rentalRepository.findOpenRentalByUser(userId);
    if (userHasRental) {
      throw new Error("Usuario já possui um aluguel em andamento");
    }

    const dateNow = new Date();
    const compareHours = (expectedReturnDate.getTime() - dateNow.getTime()) / (1000 * 60 * 60);

    if (compareHours < minimumHour) {
      throw new Error("Aluguel deve ter no mínimo 24 horas de duração");
    }

    const rental = await this.rentalRepository.create({
      userId,
      carId,
      expectedReturnDate,
      startDate: new Date(),
    } as Rental);

    await this.carRepository.updateAvailable(carId, false);

    return rental;
  }
}