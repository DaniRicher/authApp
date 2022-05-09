import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent{

  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  miFormulario:FormGroup=this.formBuilder.group({
    name:['Test 1', [Validators.required]],
    email:['test1@test.com', [Validators.required, Validators.pattern(this.emailPattern)]],
    password:['123456', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private formBuilder:FormBuilder,
              private router:Router,
              private authService:AuthService) { }

  registro(){

    const {name,email, password}=this.miFormulario.value
    this.authService.registro(name,email,password)
    .subscribe(ok=>{
      if(ok===true){
        this.router.navigateByUrl('/dashboard')
      }else{
        Swal.fire('Error', ok,'error' );
      }
    });
  }


}
