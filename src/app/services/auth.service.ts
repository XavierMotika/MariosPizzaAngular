import { Router } from '@angular/router';
import LoginRequest from '../models/security/loginRequest';
import LoginResponse from '../models/security/loginResponse';

import NewUser from '../models/security/newUser';

const address: string = '192.168.1.112:8080';

class AuthenticationService {
  // sert à accéder au back de l'application et permet de récuperer les informations présentes
  // grace aux informations données dans le login. Ces informations sont stockées dans le body
  // d'une requête de type POST, response est renvoyé sous forme de json.
  static async call(login: LoginRequest): Promise<LoginResponse | undefined> {
    const response = await fetch('http://' + address + '/auth/signin', {
      method: 'POST',
      body: JSON.stringify(login),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      return await response.json();
    } else return undefined;
  }
  // sert de point d'entree, prend en paramètre un username et un password, promet de renvoyer un boolean
  // dans un futur plus ou moins proche. On attend la réponse avant d'aller plus loin. On fait appelle
  // à la methode call qui prend en paramètre un objet LoginRequest (qui prend en parametre ces username/password)
  // elle sont assignées à response. On peut stocker le contenu de la réponse dans le localStorage, pour cela
  // on a besoin d'une clée (string) et de la donnée (également un string, qui reprends la donnée de response)
  // dans notre cas. On en profite pour ajoute un "boolean" pour le rechargement de la page.
  static async login(username: string, password: string): Promise<boolean> {
    await this.call(new LoginRequest(username, password)).then((response) => {
      if (response !== undefined) {
        localStorage.setItem('token', response.jwt);
        localStorage.setItem('expiration', response.expiration);
        localStorage.setItem('role', response.user.role);
        localStorage.setItem('id', response.user.id);
        localStorage.setItem('username', response.user.username);
        localStorage.setItem('reloaded', 'false');
        console.log(response);
      }
    });
    // On retourne la promesse de type boolean (le resolve) par la methode isAuthenticated au bout de
    // 1000 ms
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.isAuthenticated());
      }, 1000);
    });
  }

  //
  //
  static isAuthenticated(): boolean {
    const expiration = localStorage.getItem('expiration');
    const jwt = localStorage.getItem('token');

    if (
      expiration !== null &&
      Date.parse(expiration) > Date.now() &&
      jwt !== null
    ) {
      return jwt !== undefined;
    } else {
      localStorage.setItem('token', '');
      localStorage.setItem('expiration', '');
      localStorage.setItem('role', '');
      if (localStorage.getItem('reloaded') !== 'true') {
        window.location.reload();
        localStorage.setItem('reloaded', 'true');
      }
      return false;
    }
  }

  static getJwt(): any {
    this.isAuthenticated();
    return localStorage.getItem('token');
  }

  static async signUp(newUser: NewUser): Promise<boolean> {
    console.log(newUser);
    return fetch('http://' + address + '/auth/signup', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((ok) =>
        ok ? this.login(newUser.phonenumber, newUser.password) : ok
      )
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }
}

export default AuthenticationService;
