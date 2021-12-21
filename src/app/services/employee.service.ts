import { Injectable } from '@angular/core';
import { Employee } from '../model/employee';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  private userName:String;
editemployee:Employee;
  USER_SESSION_ATTRIBUTE_NAME= 'authenticatedUser';

   httpOptions = {
    headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        
    })
};

users:Employee[];

  constructor(public http:HttpClient) { }

  getEditEmployee(){
    return this.editemployee
  }
  setEditEmployee(emp:Employee){
    this.editemployee=emp
    console.log(this.editemployee)
  }

  addEmployee(employee:Employee){
    return this.http.post<Employee>("http://localhost:8080/employee",employee)
    
    
  }

  loginUser(user:Map<String,String>){
    return this.http.post<Employee>("http://localhost:8080/login",user,this.httpOptions);
  }

  editUser(user:Employee){
    return this.http.put<Employee>("http://localhost:8080/update",user,this.httpOptions);
  }

  handleLogin(user) {
    sessionStorage.setItem(this.USER_SESSION_ATTRIBUTE_NAME,JSON.stringify(user));
   // console.log(sessionStorage.getItem(this.USER_SESSION_ATTRIBUTE_NAME));
  }

  handleError(): void {
    alert("username or password is incorrect!");
  }
  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true
  }

  getLoggedInUserName() {
    let user = JSON.parse(sessionStorage.getItem(this.USER_SESSION_ATTRIBUTE_NAME));
    if (user === null) return ''
    //console.log(user);
    return user.userName
  }

  isAdmin() {
    this.userName=this.getLoggedInUserName();
    if(this.userName=="admin")
    return true;
    else{
      return false;
    }
  }

  logoutUser(){
    sessionStorage.removeItem(this.USER_SESSION_ATTRIBUTE_NAME);
    alert("logged-out successfully");
    return true;
  }
  
  getAllUsers(){
    return this.http.get<Employee[]>("http://localhost:8080/employee")
  }

  getCountries(){
    return this.http.get<any>("assets/csc.json")
  }

  getLoggedInUserId():String{

    let user = JSON.parse(sessionStorage.getItem(this.USER_SESSION_ATTRIBUTE_NAME));

    if (user === null) return ''

    console.log(user);

    return user.id

  }

  getUserByName(){

    return this.http.get("http://localhost:8080/employee/"+this.getLoggedInUserName());

  }

  deleteUserByAdmin(id:String){
    return this.http.delete("http://localhost:8080/admin/delete/"+id);
  }
}
