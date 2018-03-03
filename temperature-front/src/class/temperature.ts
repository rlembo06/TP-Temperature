export class Temperature {
    public id: number;
    public value: number;
    public voltage: number;
    public date: Date;

    constructor(
        id: number,
        value: number,
        voltage: number,
        date: Date,
    ) {
        this.id = id;
        this.value = value;
        this.voltage = voltage;
        this.date = date;
    }
}
