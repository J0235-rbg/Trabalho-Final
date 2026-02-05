export class Car{
    public id: string;
    public name: string;
    public placa: string;
    public available: boolean;

    constructor(id: string, name: string, placa: string, available: boolean = true){
        this.id = id;
        this.name = name;
        this.placa = placa;
        this.available = available;
    }
}