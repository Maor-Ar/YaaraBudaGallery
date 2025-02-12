import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FirebaseService } from '../../../services/firebase.service';
import { TranslationService } from '../../../services/translation.service';

@Component({
    selector: 'app-admin-login',
    imports: [CommonModule, ReactiveFormsModule],
    template: `
    <div class="login-container" [class.rtl]="isRtl">
      <div class="login-card">
        <h1>{{ translate('admin.login.title') }}</h1>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
          <div class="form-group">
            <label for="email">{{ translate('admin.login.email') }}</label>
            <input
              type="email"
              id="email"
              formControlName="email"
              [placeholder]="translate('admin.login.emailPlaceholder')"
              [class.error]="isFieldInvalid('email')"
            >
            <div class="error-message" *ngIf="isFieldInvalid('email')">
              {{ getErrorMessage('email') }}
            </div>
          </div>

          <div class="form-group">
            <label for="password">{{ translate('admin.login.password') }}</label>
            <div class="password-input">
              <input
                [type]="showPassword ? 'text' : 'password'"
                id="password"
                formControlName="password"
                [placeholder]="translate('admin.login.passwordPlaceholder')"
                [class.error]="isFieldInvalid('password')"
              >
              <button 
                type="button" 
                class="toggle-password"
                (click)="togglePasswordVisibility()"
                [attr.aria-label]="showPassword ? translate('admin.login.hidePassword') : translate('admin.login.showPassword')"
              >
                <i class="fas" [class.fa-eye]="!showPassword" [class.fa-eye-slash]="showPassword"></i>
              </button>
            </div>
            <div class="error-message" *ngIf="isFieldInvalid('password')">
              {{ getErrorMessage('password') }}
            </div>
          </div>

          <div class="error-message" *ngIf="loginError">
            {{ loginError }}
          </div>

          <button 
            type="submit" 
            class="login-button" 
            [disabled]="loginForm.invalid || isLoading"
          >
            <span *ngIf="!isLoading">{{ translate('admin.login.submit') }}</span>
            <div *ngIf="isLoading" class="spinner"></div>
          </button>
        </form>
      </div>
    </div>
  `,
    styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--gray-light);
      padding: var(--spacing-md);

      &.rtl {
        direction: rtl;

        .login-card {
          text-align: right;
        }

        .password-input {
          .toggle-password {
            right: auto;
            left: var(--spacing-sm);
          }
        }
      }
    }

    .login-card {
      background: white;
      padding: var(--spacing-xl);
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-lg);
      width: 100%;
      max-width: 400px;

      h1 {
        color: var(--old-burgundy);
        margin-bottom: var(--spacing-xl);
        font-size: var(--font-size-2xl);
        text-align: center;
      }
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);

      label {
        color: var(--gray-dark);
        font-size: var(--font-size-sm);
        font-weight: 500;
      }

      input {
        padding: var(--spacing-sm);
        border: 1px solid var(--gray-medium);
        border-radius: var(--border-radius-sm);
        font-size: var(--font-size-md);
        transition: border-color var(--transition-speed) var(--transition-ease);

        &:focus {
          outline: none;
          border-color: var(--mystic);
        }

        &.error {
          border-color: #dc3545;
        }
      }
    }

    .password-input {
      position: relative;

      input {
        width: 100%;
        padding-right: var(--spacing-xl);
      }

      .toggle-password {
        position: absolute;
        right: var(--spacing-sm);
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: var(--gray-dark);
        cursor: pointer;
        padding: var(--spacing-xs);
        
        &:hover {
          color: var(--old-burgundy);
        }
      }
    }

    .error-message {
      color: #dc3545;
      font-size: var(--font-size-sm);
      margin-top: var(--spacing-xs);
    }

    .login-button {
      background-color: var(--old-burgundy);
      color: white;
      border: none;
      padding: var(--spacing-md);
      border-radius: var(--border-radius-md);
      font-size: var(--font-size-md);
      font-weight: 500;
      cursor: pointer;
      transition: all var(--transition-speed) var(--transition-ease);
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 48px;

      &:hover:not(:disabled) {
        background-color: var(--mystic);
        color: var(--old-burgundy);
      }

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }

    .spinner {
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `]
})
export class AdminLoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  loginError = '';
  showPassword = false;
  isRtl = false;

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private router: Router,
    private translationService: TranslationService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.translationService.currentLang$.subscribe(() => {
      this.isRtl = this.translationService.isRtl();
    });
  }

  onSubmit() {
    if (this.loginForm.valid && !this.isLoading) {
      this.isLoading = true;
      this.loginError = '';

      const { email, password } = this.loginForm.value;

      this.firebaseService.login(email, password).subscribe({
        next: () => {
          this.router.navigate(['/admin/dashboard']);
        },
        error: (error) => {
          console.error('Login error:', error);
          this.loginError = this.translate('admin.login.error');
          this.isLoading = false;
        }
      });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched)) : false;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) {
      return this.translate('admin.login.required');
    }
    if (field.errors['email']) {
      return this.translate('admin.login.invalidEmail');
    }
    if (field.errors['minlength']) {
      return this.translate('admin.login.passwordLength');
    }

    return '';
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }
}
