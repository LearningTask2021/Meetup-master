import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Employee } from '../model/employee';
import { EmployeeService } from '../services/employee.service';
import { ColDef, ColumnApi, GridApi } from 'ag-grid-community';
import { MenuComponent } from '../menu/menu.component';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers:[]
})
export class UsersComponent implements OnInit {

  username:String="";
 isAdmin:boolean=false;
  rowData: Employee[];
  basics:ColDef[];
  columnDefs: ColDef[];
   api: GridApi;
   columnApi: ColumnApi;
  defaultColDef;
   autoGroupColumnDef;
   rowSelection;
  employee: Employee;
  
 


  constructor(private employeeService:EmployeeService) {
    this.columnDefs = this.createColumnDefs();
    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
    };
    this.autoGroupColumnDef = {
    //  headerName: 'Athlete',
      //field: 'athlete',
      minWidth: 250,
      cellRenderer: 'agGroupCellRenderer',
      cellRendererParams: { checkbox: true },
    };
    this.rowSelection = 'multiple';
   
  
   
   }
  
  ngOnInit(): void {
    this.username=this.employeeService.getLoggedInUserName();
    if(this.username=="admin")
    this.isAdmin=true
    console.log(this.isAdmin);
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
     {field:'userName',filter:true,floatingFilter:true,checkboxSelection: this.employeeService.getLoggedInUserName()=="admin" },
     {field:'company',filter:true,floatingFilter:true},
     {field:'designation',filter:true,floatingFilter:true},
     {field:'email'}
    ];
    


}

deleteSelected(){
  
 const l:any[]=this.api.getSelectedNodes();

 l.forEach(i=> 
  {
    console.log(i.data);
    this.employeeService.deleteUserByAdmin(i.data.id).subscribe(
      data=>{
        console.log("deleted!");
      }
    )
    alert("Deleted the records")
    this.ngOnInit();
   
  }
  ) 
}

editSelected(){
  const l:any[]=this.api.getSelectedNodes();
  if(l.length>1){
    alert("selelct only one profile to edit");
    return ''
  }
  else{
    this.employee=l[0]
    console.log(this.employee)
  }
 
}

}
