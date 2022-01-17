import { Injectable } from '@angular/core';
import { Employee } from '../model/employee';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, ObservableInput, of, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
 
  baseUrl:String='http://meetupapplication-env.eba-xmqy62ts.ap-south-1.elasticbeanstalk.com/';
  private userName:String;
editemployee:Employee;
  USER_SESSION_ATTRIBUTE_NAME= 'authenticatedUser';

   httpOptions = {
    headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    })
};

users:Employee[];

  constructor(public http:HttpClient,
    private toastr: ToastrService,
    private router:Router)
     { }

  getEditEmployee(){
    return this.editemployee
  }
  setEditEmployee(emp:Employee){
    this.editemployee=emp
    console.log(this.editemployee)
  }

  addEmployee(employee:Employee){
    return this.http.post<Employee>(this.baseUrl+"employee",employee)
    
    
  }

  loginUser(user:Map<String,String>){
    return this.http.post<Employee>(this.baseUrl+"login",user,this.httpOptions);
  }

  editUser(user:Employee){
    console.log("Inside service to edit user",user)
    return this.http.put<Employee>(this.baseUrl+"update",user,this.httpOptions);
  }

  handleLogin(user) {
    sessionStorage.setItem(this.USER_SESSION_ATTRIBUTE_NAME,JSON.stringify(user));
   // console.log(sessionStorage.getItem(this.USER_SESSION_ATTRIBUTE_NAME));
  }

  handleError(): void {
    //alert("username or password is incorrect!");
    this.toastr.error("Username or Password is incorrect");
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
   // alert("logged-out successfully");
   this.toastr.info("Logged out successfully");
    return true;
  }
  
  getAllUsers(){
    return this.http.get<Employee[]>(this.baseUrl+"employee")
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

    return this.http.get(this.baseUrl+"employee/"+this.getLoggedInUserName());

  }

  deleteUserByAdmin(id:String){
    return this.http.delete(this.baseUrl+"admin/delete/"+id);
  }

  addProfilePic(formData: FormData,userName) {
    let name="profilePic"
    let baseUrl=this.baseUrl+'photos/add/'+userName+'/'+name
    console.log("inside service to add image")
    return this.http.post(baseUrl,formData)
  }

  getUploadedImage(){
    let baseUrl=this.baseUrl+'photos/'+this.getLoggedInUserId()
    console.log(baseUrl)
    return this.http.get(baseUrl, {responseType: 'text'})
  }

  //handling error when server is not up! 
  handleServerError(err){
    if(err.status==0){
      console.log("inside 0 error handler")
      this.router.navigate(["../error"])
    }
    if (err.status == 404) return of(null)
    else throwError(err)
  }

}
