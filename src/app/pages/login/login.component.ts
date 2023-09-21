import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/header/header.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import AuthenticationService from 'src/app/services/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    ReactiveFormsModule,
    RouterLink,
    RouterOutlet,
  ],
  template: `
    <main>
      <form [formGroup]="loginForm" (ngSubmit)="submit()">
        <label for="phonenumber">Identifiant</label>
        <input
          type="text"
          formControlName="phonenumber"
          [style]="
            checkForErrorColor(
              this.loginForm.getError('required', 'phonenumber') ||
                this.loginForm.getError('minlength', 'phonenumber') ||
                this.loginForm.getError('maxlength', 'phonenumber')
            )
          "
        />
        <div
          *ngIf="this.loginForm.getError('required', 'phonenumber')"
          [hidden]="!this.loginForm.getError('required', 'phonenumber')"
        >
          Téléphone requis
        </div>
        <div
          *ngIf="this.loginForm.getError('minlength', 'phonenumber')"
          [hidden]="!this.loginForm.getError('minlength', 'phonenumber')"
        >
          10 numéros requis
        </div>
        <div
          *ngIf="this.loginForm.getError('maxlength', 'phonenumber')"
          [hidden]="!this.loginForm.getError('maxlength', 'phonenumber')"
        >
          10 numéros requis
        </div>
        <label for="password">Mot de passe</label>
        <input
          type="password"
          formControlName="password"
          [style]="
            checkForErrorColor(
              this.loginForm.getError('required', 'password') ||
                this.loginForm.getError('minlength', 'password')
            )
          "
        />
        <div
          *ngIf="this.loginForm.getError('required', 'password')"
          [hidden]="!this.loginForm.getError('required', 'password')"
        >
          Mot de passe requis
        </div>
        <div
          *ngIf="this.loginForm.getError('minlength', 'password')"
          [hidden]="!this.loginForm.getError('minlength', 'password')"
        >
          Au moins 6 caractères
        </div>
        <a [routerLink]="['/signup']">créer un compte</a>
        <button type="submit">Connexion</button>
        <p></p>
      </form>
    </main>
  `,
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    phonenumber: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(private router: Router) {}

  submit() {
    console.log(this.loginForm.value);
    AuthenticationService.login(
      this.loginForm.value.phonenumber ?? '',
      this.loginForm.value.password ?? ''
    ).then((response) => {
      this.setError(response);
      response ? this.router.navigate(['order']) : null;
    });
  }
  private error: boolean = false;

  setError(response: boolean) {
    this.error = response;
  }

  getError() {
    return this.error;
  }

  checkForErrorColor(inputError: boolean) {
    if (inputError) {
      return 'border-color : #CB0000';
    } else {
      return 'border-color : #33DF11';
    }
  }
}
