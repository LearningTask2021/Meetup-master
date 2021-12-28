import { Component, Input, OnInit, Output } from '@angular/core';
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
  imagePath:String;
  srcString:String;
  //constructor();
  constructor(private employeeService:EmployeeService,
    private router: Router) { 
     
     
    }
  

  ngOnInit(): void {
    if(this.isLoggedIn){
    this.employeeService.getUploadedImage().subscribe((response)=>{
      console.log(response)
      this.imagePath=response
      console.log(this.imagePath)
      if(this.imagePath){
        this.srcString="data:image/jpg;base64," + this.imagePath
      }
      else{
        this.srcString="assets/images/defaultAvatar.png"
      }
    console.log(this.srcString)
      
      })
    }

    
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
