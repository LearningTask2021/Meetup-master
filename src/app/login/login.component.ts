import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { EmployeeService } from '../services/employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  display=false;
   user = new Map<String, string>();

  constructor( 
    private employeeService:EmployeeService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ){

  }
     
    ngOnInit() {
      this.loginForm = this.formBuilder.group({
          userName: ['', Validators.required],
          password: ['', Validators.required]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if(this.loginForm.valid){
     
      //console.log(this.loginForm.controls);
      
      
        this.user["UserName"] = this.loginForm.value["userName"];
        this.user["password"] = this.loginForm.value["password"];


    this.employeeService.loginUser(this.user).subscribe(
      (data)=>
      {
        console.log(data);
        if(data!=null){ 
        this.employeeService.handleLogin(data);
         // alert('login successful');
         this.toastr.success('Loggedin successfully!');
          console.log(this.user["UserName"])
          if(this.user["UserName"]=="admin"){
            console.log("inside admin method")
            this.router.navigate(['../admin'],{state: {data:this.f.userName.value}})
            return ''
          }
          else{
          this.router.navigate(['../users'],{state: {data:this.f.userName.value}});
          }
        }
        else{
          this.employeeService.handleError();
          
        }
      }
    );
      }
     
}

}