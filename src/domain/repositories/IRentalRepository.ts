import { Rental } from "../entities/Rental";

export interface IRentalRepository { 
    create(data: Rental): Promise<Rental>
    findOpenRentalByCar(carId: string): Promise<Rental | null>
    findOpenRentalByUser(userId: string): Promise<Rental | null>
}