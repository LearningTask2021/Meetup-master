import { Attribute, Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../model/employee';
import { EmployeeService } from '../services/employee.service';
import { MenuComponent } from '../menu/menu.component';
import { Address } from '../model/address';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers:[EmployeeService]
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;
  countryArr: any;
  stateArr: any;
  cityArr: any;
  submitted = false;
  private employee:Employee;
  isLoggedIn:boolean;
  required:any;
  constructor(
    private employeeService:EmployeeService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) { }
  
  ngOnInit(): void {
    
    this.getCountries();
    this.isLoggedIn=this.employeeService.isUserLoggedIn();
    //this.required=this.isLoggedIn?Validators.nullValidator:Validators.required;
    this.form = this.formBuilder.group({
      address: this.formBuilder.group({
       streetName:[''],
      city:[''],
      state:[''],
      country:[''],
      zipCode:[''],
      }),
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email:['', [Validators.email,Validators.required]],
      mobileNumber:['',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      company:[''],
      designation:[''],
      dateofBirth:[''],
      userName: new FormControl({value: '', disabled: this.isLoggedIn?true:false}, Validators.required),
      password: ['', [this.isLoggedIn?Validators.nullValidator:Validators.required, Validators.minLength(6)]],
      confirmPassword:['',this.isLoggedIn?Validators.nullValidator:Validators.required],
    }
    ,{ 
      // here we attach our form validator
    
      validators: this.isLoggedIn? Validators.nullValidator :this.controlsEqual('confirmPassword', 'password')

    });
    if (this.isLoggedIn) {

      // this.form.get("userName").disable();
 
       this.employeeService.getUserByName().subscribe(x => this.form.patchValue(x));
 
   }
}
 controlsEqual(
  controlName: string,
  equalToName: string,
  errorKey: string = controlName // here you can customize validation error key 
) {

  return (form: FormGroup) => {
    const control = form.get(controlName);
    if(this.form.get('password').dirty){
    if (control.value !== form.get(equalToName).value) {
      control.setErrors({ [errorKey]: true });
      return {
        [errorKey]: true
      }
    } else {
      control.setErrors(null);
      return null
    } 
  }
}
}

  get f() { return this.form.controls; }

  addUser() {
    this.employeeService.addEmployee(this.employee).subscribe(
      data=>{
        if(data==null){
          alert("userName is already taken");
        }
        else{
        console.log('from post method');
        console.log(data);
       alert("Registerred successfully");
       this.router.navigate(['/login']);
        }
      }
    );
   

  }

  editUser(){
      this.employeeService.editUser(this.employee).subscribe(

        data=>{
     
          console.log(data);
     
        alert("Updated details!");
     
        this.router.navigate(["../users"]);
     
        },
     
        error=>{
     
          console.log(error.error);
     
        }
     
      );
 }

  onSubmit(){
    this.submitted = true;
    console.log(this.form.controls.STATUS);

    if(this.form.valid){

      if(this.form.controls.userName.value=="admin"){
        alert("username cannot be admin");
        return "";
      }
      this.employee=Object.assign({},this.form.value);
      this.employee.address=Object.assign({},this.employee.address);
      this.employee.id=this.employeeService.getLoggedInUserId();
      console.log(this.employee.userName);
      
    if(this.isLoggedIn){
    console.log("Submitted");
    this.employee.userName=this.employeeService.getLoggedInUserName();
    this.editUser();
    }
    else
    this.addUser();
  }
}
 
 

  interpolate(){
    if(this.employeeService.isUserLoggedIn())
     return this.employeeService.getLoggedInUserName();
    else
     return "Username";
  }

  getCountries(){
    this.employeeService.getCountries().subscribe(data=>{
       this.countryArr=data;
    })
  }

  getStates(event){
    console.log("States");
    this.stateArr=this.countryArr[parseInt((event.target.value))+1].states;
  }

  getCities(event){
    var index = this.stateArr.findIndex(state => state.id==event.target.value);
    this.cityArr=this.stateArr[index].cities;
  }
}
