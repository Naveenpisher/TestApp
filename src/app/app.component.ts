import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  title = 'TestApp';

  showalert = false;

  myForm!: FormGroup;

  errorList: any = [];

  constructor(private fbbuilder: FormBuilder) {
    this.myForm = this.fbbuilder.group({
      Name: [''],
      Age: [''],
      Email: [''],
      Contact: [''],
    })
  }


  ngOnInit(): void {


  }


  submit() {

    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //NAME 

    const { Name, Age, Email, Contact } = this.myForm.value;

    let nameerror = Name ? Name.length > 5 && Name.length < 10 : false;

    if (!nameerror) {

      if (!this.errorList.find((e: any) => e.id == 1)) {
        this.errorList.push({ error: 'Name Must Be Min 5 to Max 10 Chanrs', id: 1 })
      }

    } else {
      this.errorList = this.errorList.filter((e: any) => e.id != 1)

    }

    let ageerror = Age ? +Age >= 18 && +Age <= 30 : false;

    if (!ageerror) {

      if (!this.errorList.find((e: any) => e.id == 2)) {

        this.errorList.push({ id: 2, error: 'Age Must be 18 to 30' })
      }
    }
    else {
      this.errorList = this.errorList.filter((e: any) => e.id != 2)

    }


    let contacterror = Contact ? Contact.length >= 10 : false;


    if (!contacterror) {
      if (!this.errorList.find((e: any) => e.id == 3)) {
        this.errorList.push({ id: 3, error: 'Contact Must not  be more than 10 chars' })
      }
    }
    else {
      this.errorList = this.errorList.filter((e: any) => e.id != 3)

    }


    let emailerror = Email ? regularExpression.test(String(Email).toLowerCase()) : false;

    if (!emailerror) {
      if (!this.errorList.find((e: any) => e.id == 4)) {
        this.errorList.push({ id: 4, error: 'Invalid Email Format' })
      }
    }
    else {
      this.errorList = this.errorList.filter((e: any) => e.id != 4)

    }



    if (this.errorList.length) {
      this.showalert = true;
    } else {
      alert('Form Submiited Successfully');
      this.errorList = [];
    }


  }
}
