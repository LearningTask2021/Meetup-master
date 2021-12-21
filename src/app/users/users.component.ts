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
  basics:ColDef[];
  columnDefs: ColDef[];
   api: GridApi;
   columnApi: ColumnApi;
  defaultColDef;
   autoGroupColumnDef;
   rowSelection;
  
 


  constructor(private employeeService:EmployeeService) {
    this.columnDefs = this.createColumnDefs();
    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
    };
    this.autoGroupColumnDef = {
      headerName: 'Athlete',
      field: 'athlete',
      minWidth: 250,
      cellRenderer: 'agGroupCellRenderer',
      cellRendererParams: { checkbox: true },
    };
    this.rowSelection = 'multiple';
   
  
   
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
     {field:'userName',filter:true,floatingFilter:true,checkboxSelection: true},
     {field:'company',filter:true,floatingFilter:true},
     {field:'designation',filter:true,floatingFilter:true},
     {field:'email'}
    ];
    


}

getSelected(){
 const l:any[]=this.api.getSelectedNodes();
 
 l.forEach(i=> 
  {
    console.log(i.data);
    this.employeeService.deleteUserByAdmin(i.data.id).subscribe(
      data=>{
        console.log("deleted!");
        alert("Deleted the records")
        this.ngOnInit();
      }
    )
   
  }
  )
 
 
}
}
