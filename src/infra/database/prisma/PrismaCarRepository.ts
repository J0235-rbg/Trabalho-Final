import { injectable } from "inversify";
import * as Prisma from "@prisma/client";
import { ICarRepository } from "../../../domain/repositories/ICarRepository";
import { Car } from "../../../domain/entities/Car";
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