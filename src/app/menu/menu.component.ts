import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

   isLoggedIn=this.employeeService.isUserLoggedIn();
   isAdmin=this.employeeService.isAdmin();
  //constructor();
  constructor(private employeeService:EmployeeService,
    private router: Router) { 
     
    }
  

  ngOnInit(): void {
    
  }
  
  

  handleLogout() {
    if(this.employeeService.logoutUser()){
      this.router.navigate(["../home"]);
    }
    
  }

  editProfile(){
    this.router.navigate(["../register"]);
  }

}
