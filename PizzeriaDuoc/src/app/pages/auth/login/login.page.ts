import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RandomuserService } from 'src/app/services/api/randomuser.service';
import { AuthfirebaseService } from 'src/app/services/firebase/authfirebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup; // PARA VALIDAR EL FORMULARIO
  emailValue!: string; // CAPTURAR LA INFO DEL FORM
  passwordValue!: string; // CAPTURAR LA INFO DEL FORM

  usuario: any;
  usuarios: any[] = [];

  constructor(
    private formBuilder: FormBuilder, 
    private authFire:AuthfirebaseService,
    private router:Router,
    private randomUser: RandomuserService
    ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  ngOnInit() {
    //this.getRandomUser();
    //this.getRandomUsers();
    this.authFire.checkAuthentication()
    .then((user) => {
      if (user) {
        this.router.navigate(['pizzas']);
      }
      
    })
    .catch((error) => {
      console.log('Error en la autenticación:', error);
    });
  }

  async login() {
    try {
      await this.authFire.login(this.emailValue,this.passwordValue);
      
    } catch (error) {
      
    }
  }

  async register() {
    try {
      await this.authFire.register(this.emailValue,this.passwordValue);
    } catch (error) {
      
    }
  }

  getRandomUser() {
    this.randomUser.getRandomUser().subscribe((aux) => {
      this.usuario = aux.results[0];
      this.emailValue = this.usuario.email.replace('@example.com','@duocuc.cl')
      this.passwordValue = this.usuario.login.password;

      console.log(this.usuario);
    });
  }

  getRandomUsers() {
    this.randomUser.getRandomUsers().subscribe((aux) => {
      this.usuarios = aux.results;
      
      this.usuarios.forEach(async (user) => {
        this.emailValue = user.email.replace('@example.com','@duocuc.cl');
        this.passwordValue = user.login.password;

        await this.register();
      });
      console.log('Usuarios regitrados en firebase:', this.usuarios);
    });
  }

}
