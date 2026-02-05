export class Rental {
    public id: string;
    public userId: string;
    public carId: string;
    public startDate: Date;
    public expectedReturnDate: Date;
    public endDate: Date;

    constructor(id: string, userId: string, carId: string, startDate = new Date(), expectedReturnDate: Date, endDate: Date) {
        this.id = id;
        this.userId = userId;
        this.carId = carId;
        this.startDate = startDate;
        this.expectedReturnDate = expectedReturnDate;
        this.endDate = endDate;
    }
}