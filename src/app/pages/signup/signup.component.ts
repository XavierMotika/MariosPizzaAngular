import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import AuthenticationService from 'src/app/services/auth.service';
import NewUser from 'src/app/models/security/newUser';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { confirmPasswordValidator } from 'src/app/helper/confrimPasswordFn';
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ReactiveFormsModule],
  template: `
    <main>
      <form [formGroup]="signUpForm" (ngSubmit)="submit()">
        <label for="firstName">Prénom</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          formControlName="firstName"
          [style]="
            checkForErrorColor(
              this.signUpForm.getError('required', 'firstName') ||
                this.signUpForm.getError('minlength', 'firstName')
            )
          "
        />
        <div
          *ngIf="this.signUpForm.getError('required', 'firstName')"
          [hidden]="!this.signUpForm.getError('required', 'firstName')"
        >
          Prénom requis
        </div>
        <div
          *ngIf="this.signUpForm.getError('minlength', 'firstName')"
          [hidden]="!this.signUpForm.getError('minlength', 'firstName')"
        >
          Au moins 2 caractère requis
        </div>

        <label for="lastName">Nom</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          formControlName="lastName"
          [style]="
            checkForErrorColor(
              this.signUpForm.getError('required', 'lastName') ||
                this.signUpForm.getError('minlength', 'lastName')
            )
          "
        />
        <div
          *ngIf="this.signUpForm.getError('required', 'lastName')"
          [hidden]="!this.signUpForm.getError('required', 'lastName')"
        >
          Nom requis
        </div>
        <div
          *ngIf="this.signUpForm.getError('minlength', 'lastName')"
          [hidden]="!this.signUpForm.getError('minlength', 'lastName')"
        >
          Au moins 2 caractère requis
        </div>

        <label for="phoneNumber">Téléphone</label>
        <input
          type="text"
          formControlName="phoneNumber"
          [style]="
            checkForErrorColor(
              this.signUpForm.getError('required', 'phoneNumber') ||
                this.signUpForm.getError('minlength', 'phoneNumber') ||
                this.signUpForm.getError('maxlength', 'phoneNumber')
            )
          "
        />
        <div
          *ngIf="this.signUpForm.getError('required', 'phoneNumber')"
          [hidden]="!this.signUpForm.getError('required', 'phoneNumber')"
        >
          Téléphone requis
        </div>
        <div
          *ngIf="this.signUpForm.getError('minlength', 'phoneNumber')"
          [hidden]="!this.signUpForm.getError('minlength', 'phoneNumber')"
        >
          10 numéros requis
        </div>
        <div
          *ngIf="this.signUpForm.getError('maxlength', 'phoneNumber')"
          [hidden]="!this.signUpForm.getError('maxlength', 'phoneNumber')"
        >
          10 numéros requis
        </div>

        <label for="password">Mot de passe</label>
        <input
          type="password"
          formControlName="password"
          [style]="
            checkForErrorColor(
              this.signUpForm.getError('required', 'password') ||
                this.signUpForm.getError('minlength', 'password')
            )
          "
        />

        <div
          *ngIf="this.signUpForm.getError('required', 'password')"
          [hidden]="!this.signUpForm.getError('required', 'password')"
        >
          Mot de passe requis
        </div>
        <div
          *ngIf="this.signUpForm.getError('minlength', 'password')"
          [hidden]="!this.signUpForm.getError('minlength', 'password')"
        >
          Au moins 6 caractères
        </div>

        <label for="confirmPassword">Confirmer le mot de passe</label>
        <input
          type="password"
          formControlName="confirmPassword"
          [style]="
            checkForErrorColor(
              this.signUpForm.getError('required', 'confirmPassword') ||
                !confirmPassword
            )
          "
        />

        <div
          *ngIf="this.signUpForm.getError('required', 'confirmPassword')"
          [hidden]="!this.signUpForm.getError('required', 'confirmPassword')"
        >
          Veuiller confirmer le mot de passe
        </div>
        <div *ngIf="!confirmPassword" [hidden]="confirmPassword">
          Doit être identique au mot de passe
        </div>

        <label for="address">Adresse</label>
        <input
          type="text"
          formControlName="address"
          [style]="
            checkForErrorColor(this.signUpForm.getError('required', 'address'))
          "
        />

        <div
          *ngIf="this.signUpForm.getError('required', 'address')"
          [hidden]="!this.signUpForm.getError('required', 'address')"
        >
          Adresse requise
        </div>

        <button type="submit">Créer</button>
        <div *ngIf="this.getError()" [hidden]="this.getError()">
          Connexion impossible
        </div>
      </form>
    </main>
  `,
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signUpForm = this.form.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    phoneNumber: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, confirmPasswordValidator]],
    address: ['', Validators.required],
  });

  checkForErrorColor(inputError: boolean) {
    if (inputError) {
      return 'border-color : #CB0000';
    } else {
      return 'border-color : #33DF11';
    }
  }

  constructor(private form: FormBuilder, private router: Router) {}

  confirmPassword: Function = confirmPasswordValidator;

  private error: boolean = false;

  setError(response: boolean) {
    this.error = response;
  }

  getError() {
    return this.error;
  }

  submit() {
    if (this.signUpForm.valid) {
      let newUser: NewUser = new NewUser(
        this.signUpForm.value.firstName ?? '',
        this.signUpForm.value.lastName ?? '',
        this.signUpForm.value.password ?? '',
        this.signUpForm.value.phoneNumber ?? '',
        this.signUpForm.value.address ?? '',
        ['1']
      );
      console.log(newUser);
      AuthenticationService.signUp(newUser).then(
        (response) => (this.setError(response), this.router.navigate(['order']))
      );
    }
  }
}
