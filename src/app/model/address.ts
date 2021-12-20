import { zip } from "rxjs";

export class Address {
    id:String;
    streetName:String;
    city:String;
    state:String;
    zipCode:String;
    country:String;

    /**
     *
     */
    constructor(id:String,streetName:String,city:string,state:String,zipCode:String,country:String) {
        this.id=id;
        this.streetName=streetName;
        this.city=city;
        this.state=state;
        this.country=country;
        this.zipCode=zipCode;
        
    }
}
