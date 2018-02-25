export class Temperature {
    public id: number;
    public value: number;
    public volt: number;
    public date: string;

    constructor(
        id: number,
        value: number,
        volt: number,
        date: string,
    ) {
        this.id = id;
        this.value = value;
        this.volt = volt;
        this.date = date;
    }
}
