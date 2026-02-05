import { Car } from "../entities/Car.js"

export interface ICarRepository {
    findById(id: string): Promise <Car | null>
    findByPlaca(placa: string): Promise <Car | null>
    updateAvailable(id: string, available: boolean): Promise<void>
}