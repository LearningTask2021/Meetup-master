import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { EmployeeService } from '../services/employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';


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

  constructor( 
    private employeeService:EmployeeService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
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
      const user = new Map<String, string>();
      
        user["UserName"] = this.loginForm.value["userName"];
        user["password"] = this.loginForm.value["password"];

    this.employeeService.loginUser(user).subscribe(
      (data)=>
      {
        console.log(data);
        if(data!=null){ 
        this.employeeService.handleLogin(data);
          alert('login successful');
          this.router.navigate(['../users'],{state: {data:this.f.userName.value}});
        }
        else{
          this.employeeService.handleError();
          
        }
      }
    );
      }
     
}

}