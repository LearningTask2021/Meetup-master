import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/employee';
import { EmployeeService } from '../services/employee.service';
import { ColDef, ColumnApi, GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  username:String="";
 
  rowData: Employee[];
  columnDefs: ColDef[];
  private api: GridApi;
  private columnApi: ColumnApi;


  constructor(private employeeService:EmployeeService) {
    this.columnDefs = this.createColumnDefs();
   }
  
  ngOnInit(): void {
    this.username=this.employeeService.getLoggedInUserName();
    this.employeeService.getAllUsers().subscribe(
      data=>
      {
        this.rowData=data;
        console.log(this.rowData);
      }
    );
   
    
  }

  
    onGridReady(params): void {
        this.api = params.api;
        this.columnApi = params.columnApi;
        this.api.sizeColumnsToFit();
    }

  createColumnDefs(): ColDef[] {
   return [
     {field:'userName',filter:true,floatingFilter:true},
     {field:'company',filter:true,floatingFilter:true},
     {field:'designation',filter:true,floatingFilter:true},
     {field:'email'}
   ]
  }


}
