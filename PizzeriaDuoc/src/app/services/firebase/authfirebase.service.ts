import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthfirebaseService {

  constructor(private auth: AngularFireAuth, private router:Router) { }

  async login(email:string, password:string) {
    try {
      const userCredential = await this.auth.signInWithEmailAndPassword(email,password);
      //console.log("SESION INICIADA");
      this.router.navigate(['pizzas']);
    } catch (error) {
      console.error("ERROR AL INICIAR SESION");
    }
  }

  async register(email:string, password:string) { 
    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(email,password);
      console.log("USUARIO CREADO");
    } catch (error) {
      console.error("ERROR AL CREAR USUARIO");
    }
  }

  async logout() {
    try {
      await this.auth.signOut();
      
      console.log("SESION FINALIZADA");
    } catch (error) {
      console.error("ERROR AL FINALIZAR SESION");
    }
  }

  checkAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        resolve(user);
      }, (error) => {
        reject(error);
      });
    });
  }
}
