import { trigger, style, state, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass'],
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  animations: [
    trigger('switchPage', [
      state('up', style({
        height: '83px',
        opacity: 1
      })),
      state('in', style({
        height: 0,
        opacity: 0
      })),
      transition('up => in', [
        animate('0.6s')
      ]),
      transition('in => up', [
        animate('0.6s')
      ]),
    ])
  ]
})
export class FormComponent implements OnInit {

  formGroup: FormGroup;
  isSignUp = false;
  loading = false;
  errorMessage = '';

  constructor(
    private _fb: FormBuilder,
    private authService: AuthService
  ) {
    this.formGroup = this._fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      userNameEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.loading = true;
      this.errorMessage = '';
      
      const { userNameEmail, password, fullName } = this.formGroup.value;

      if (this.isSignUp) {
        this.authService.register({
          email: userNameEmail,
          password: password,
          fullName: fullName,
          createdAt: new Date().toISOString()
        }).subscribe({
          next: () => {
            this.loading = false;
            // Adicionar lógica de sucesso (ex: redirecionar)
          },
          error: (error) => {
            this.loading = false;
            this.errorMessage = error.message || 'Registration failed';
          }
        });
      } else {
        this.authService.login(userNameEmail, password).subscribe({
          next: () => {
            this.loading = false;
            // Adicionar lógica de sucesso (ex: redirecionar)
          },
          error: (error) => {
            this.loading = false;
            this.errorMessage = error.message || 'Login failed';
          }
        });
      }
    } else {
      Object.keys(this.formGroup.controls).forEach(key => {
        const control = this.formGroup.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  onGoogleLogin() {
    // Implementar lógica do Google Login
  }

  isValid(form: FormControl | any) {
    return form.invalid && form.touched;
  }

}
