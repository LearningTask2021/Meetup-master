import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-update-profile-pic',
  templateUrl: './update-profile-pic.component.html',
  styleUrls: ['./update-profile-pic.component.css']
})
export class UpdateProfilePicComponent implements OnInit {

  @ViewChild('fileInput') inputEl: ElementRef;
  profilePic = new FormControl('profilePic')
 

  constructor( private employeeService:EmployeeService,
    private formBuilder: FormBuilder,private router: Router) { }
 
  ngOnInit(): void {
    
  }

  updateProfilePic(){
      this.addPhoto();
  }
    addPhoto(){
      console.log("Inside add pic")
      let inputEl: HTMLInputElement = this.inputEl.nativeElement;
      let formData = new FormData();
      const params=new HttpParams();
      params.append("title","profilePic");
      formData.append('image', inputEl.files.item(0));
      if(inputEl.files.item(0)){
      this.employeeService.addProfilePic(formData,this.employeeService.getLoggedInUserName())
           .subscribe((data)=>{
                  console.log(data)
                alert("profile pic updated!")
              }
                );
            }
    }

}
