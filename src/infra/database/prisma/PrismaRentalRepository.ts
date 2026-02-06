import { injectable } from "inversify";
import * as Prisma from "@prisma/client";
import type { IRentalRepository } from "../../../domain/repositories/IRentalRepository.js";
import { Rental } from "../../../domain/entities/Rental.js";
import { PrismaClient } from "@prisma/client/extension";

@injectable()
export class PrismaRentalRepository implements IRentalRepository {
    private prisma = new PrismaClient();
    
    async create({ userId, carId, expectedReturnDate}: Rental): Promise<Rental> {
        const rental = await this.prisma.rental.create({
            data: {
                userId,
                carId,
                expectedReturnDate,
            },
        });
        return rental as Rental;
    }
    
    async findOpenRentalByCar(carId: string): Promise<Rental | null> {
        const rental = await this.prisma.rental.findFirst({
            where: { carId, endDate:null },
        });
        return rental as Rental | null;
    }
    async findOpenRentalByUser(userId: string): Promise<Rental | null> {
        const rental = await this.prisma.rental.findFirst({
            where: { userId, endDate:null },
        });
        return rental as Rental | null;
    }
}