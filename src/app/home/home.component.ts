import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isloggedOut=true;

  constructor(private employeeService:EmployeeService) { }

  ngOnInit(): void {
    this.isloggedOut=!(this.employeeService.isUserLoggedIn());
  }

}
