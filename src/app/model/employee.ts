import { Binary } from "@angular/compiler";
import { add } from "ngx-bootstrap/chronos";
import { Address } from "./address";

export class Employee {
     id:String;
     firstName:String;
     lastName:String;
     email:String;
     mobileNumber:String;
     address:Address;
     company:String;
     designation:String;
     dob:Date;
     userName:String;
     password:String;
     title:String;
     image:Binary;
    
/**
 *
 */
constructor(id:String,firstName:String,lastName:String,email:String,mobileNumber:String,address:Address,company:String,designation:String,dob:Date,userName:String,password:String,title:String,image:Binary){
this.id=id;
this.firstName=firstName;
this.lastName=lastName;
this.email=email;
this.mobileNumber=mobileNumber;
this.address=address;
this.company=company;
this.designation=designation;
this.dob=dob;
this.userName=userName;
this.password=password;
this.title=title;
this.image=image;
}

}
