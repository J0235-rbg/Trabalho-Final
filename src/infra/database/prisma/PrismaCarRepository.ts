import { injectable } from "inversify";
import * as Prisma from "@prisma/client";
import type { ICarRepository } from "../../../domain/repositories/ICarRepository.js";
import { Car } from "../../../domain/entities/Car.js";
import { PrismaClient } from "@prisma/client/extension";

@injectable()
export class PrismaCarRepository implements ICarRepository { 
    private prisma = new PrismaClient();

    async findById(id: string): Promise<Car | null> {
        return await this.prisma.car.findUnique({
            where: { id }
        });
    }

    async findByPlaca(placa: string): Promise<Car | null> {
        return await this.prisma.car.findUnique({
            where: { placa }
        });
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        await this.prisma.car.update({
            where: { id },
            data: { available }
        });
    }
}