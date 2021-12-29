import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  errorMsg:String

  constructor() { }

  ngOnInit(): void {
    this.errorMsg="Unable to connect to server!"
  }

}
