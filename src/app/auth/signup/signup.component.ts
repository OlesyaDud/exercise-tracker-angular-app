import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  maxDate: any;


  constructor(private authServ: AuthService) { }

  ngOnInit(){
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(f: NgForm) {
    console.log(f.value)
    this.authServ.registerUser({
      // accessing by name in the form
      email: f.value.email,
      password: f.value.password
    });
  }
}
