import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslationService } from '../../services/translation.service';
import { FirebaseService } from '../../services/firebase.service';

@Component({
    selector: 'app-contact',
    imports: [CommonModule, ReactiveFormsModule],
    template: `
    <section class="contact-section" [class.rtl]="isRtl">
      <div class="section-header">
        <h2>{{ translate('contact.title') }}</h2>
        <p class="section-description">{{ translate('contact.description') }}</p>
      </div>

      <div class="contact-container">
        <div class="contact-info">
          <div class="info-item">
            <i class="fas fa-envelope"></i>
            <div class="info-content">
              <h3>{{ translate('contact.email') }}</h3>
              <p>{{ contactEmail }}</p>
            </div>
          </div>
          <div class="info-item">
            <i class="fas fa-phone"></i>
            <div class="info-content">
              <h3>{{ translate('contact.phone') }}</h3>
              <p>{{ contactPhone }}</p>
            </div>
          </div>
          <div class="info-item">
            <i class="fas fa-clock"></i>
            <div class="info-content">
              <h3>{{ translate('contact.hours') }}</h3>
              <p>{{ translate('contact.businessHours') }}</p>
            </div>
          </div>
          <div class="social-links">
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-facebook"></i>
            </a>
          </div>
        </div>

        <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="contact-form">
          <div class="form-group">
            <label for="name">{{ translate('contact.form.name') }}</label>
            <input 
              type="text" 
              id="name" 
              formControlName="name"
              [placeholder]="translate('contact.form.namePlaceholder')"
              [class.error]="isFieldInvalid('name')">
            <div class="error-message" *ngIf="isFieldInvalid('name')">
              {{ translate('contact.form.nameRequired') }}
            </div>
          </div>

          <div class="form-group">
            <label for="email">{{ translate('contact.form.email') }}</label>
            <input 
              type="email" 
              id="email" 
              formControlName="email"
              [placeholder]="translate('contact.form.emailPlaceholder')"
              [class.error]="isFieldInvalid('email')">
            <div class="error-message" *ngIf="isFieldInvalid('email')">
              {{ translate('contact.form.emailInvalid') }}
            </div>
          </div>

          <div class="form-group">
            <label for="phone">{{ translate('contact.form.phone') }}</label>
            <input 
              type="tel" 
              id="phone" 
              formControlName="phone"
              [placeholder]="translate('contact.form.phonePlaceholder')">
          </div>

          <div class="form-group">
            <label for="subject">{{ translate('contact.form.subject') }}</label>
            <select 
              id="subject" 
              formControlName="subject"
              [class.error]="isFieldInvalid('subject')">
              <option value="">{{ translate('contact.form.selectSubject') }}</option>
              <option value="artwork">{{ translate('contact.form.subjectArtwork') }}</option>
              <option value="tattoo">{{ translate('contact.form.subjectTattoo') }}</option>
              <option value="event">{{ translate('contact.form.subjectEvent') }}</option>
              <option value="commission">{{ translate('contact.form.subjectCommission') }}</option>
              <option value="other">{{ translate('contact.form.subjectOther') }}</option>
            </select>
            <div class="error-message" *ngIf="isFieldInvalid('subject')">
              {{ translate('contact.form.subjectRequired') }}
            </div>
          </div>

          <div class="form-group">
            <label for="message">{{ translate('contact.form.message') }}</label>
            <textarea 
              id="message" 
              formControlName="message"
              [placeholder]="translate('contact.form.messagePlaceholder')"
              rows="5"
              [class.error]="isFieldInvalid('message')"></textarea>
            <div class="error-message" *ngIf="isFieldInvalid('message')">
              {{ translate('contact.form.messageRequired') }}
            </div>
          </div>

          <button 
            type="submit" 
            class="submit-button" 
            [disabled]="contactForm.invalid || isSubmitting">
            {{ isSubmitting ? translate('contact.form.sending') : translate('contact.form.send') }}
          </button>

          <div class="form-message" *ngIf="submitMessage" [class.success]="submitSuccess">
            {{ submitMessage }}
          </div>
        </form>
      </div>
    </section>
  `,
    styles: [`
    .contact-section {
      padding: var(--spacing-xl) var(--spacing-lg);
      background-color: var(--gray-light);

      &.rtl {
        direction: rtl;
        text-align: right;

        .form-group {
          text-align: right;
        }

        .error-message {
          text-align: right;
        }
      }
    }

    .section-header {
      text-align: center;
      margin-bottom: var(--spacing-xl);

      h2 {
        color: var(--old-burgundy);
        font-size: var(--font-size-3xl);
        margin-bottom: var(--spacing-md);
      }

      .section-description {
        color: var(--gray-dark);
        max-width: 600px;
        margin: 0 auto;
      }
    }

    .contact-container {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: var(--spacing-xl);
      max-width: 1200px;
      margin: 0 auto;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }

    .contact-info {
      background: white;
      padding: var(--spacing-xl);
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-md);
    }

    .info-item {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-md);
      margin-bottom: var(--spacing-lg);

      i {
        color: var(--old-burgundy);
        font-size: var(--font-size-xl);
      }

      .info-content {
        h3 {
          color: var(--old-burgundy);
          margin: 0 0 var(--spacing-xs);
          font-size: var(--font-size-md);
        }

        p {
          color: var(--gray-dark);
          margin: 0;
        }
      }
    }

    .social-links {
      display: flex;
      gap: var(--spacing-md);
      margin-top: var(--spacing-xl);

      a {
        width: 40px;
        height: 40px;
        background-color: var(--old-burgundy);
        color: white;
        border-radius: var(--border-radius-full);
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        transition: background-color var(--transition-speed) var(--transition-ease);

        &:hover {
          background-color: var(--mystic);
        }

        i {
          font-size: var(--font-size-lg);
        }
      }
    }

    .contact-form {
      background: white;
      padding: var(--spacing-xl);
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-md);
    }

    .form-group {
      margin-bottom: var(--spacing-lg);

      label {
        display: block;
        color: var(--old-burgundy);
        margin-bottom: var(--spacing-xs);
        font-weight: 500;
      }

      input,
      select,
      textarea {
        width: 100%;
        padding: var(--spacing-sm);
        border: 1px solid var(--gray-medium);
        border-radius: var(--border-radius-sm);
        font-size: var(--font-size-md);
        transition: border-color var(--transition-speed) var(--transition-ease);

        &:focus {
          outline: none;
          border-color: var(--old-burgundy);
        }

        &.error {
          border-color: #dc3545;
        }
      }

      textarea {
        resize: vertical;
      }
    }

    .error-message {
      color: #dc3545;
      font-size: var(--font-size-sm);
      margin-top: var(--spacing-xs);
    }

    .submit-button {
      width: 100%;
      padding: var(--spacing-md);
      background-color: var(--old-burgundy);
      color: white;
      border: none;
      border-radius: var(--border-radius-sm);
      font-size: var(--font-size-md);
      cursor: pointer;
      transition: background-color var(--transition-speed) var(--transition-ease);

      &:hover:not(:disabled) {
        background-color: var(--mystic);
      }

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }

    .form-message {
      margin-top: var(--spacing-md);
      padding: var(--spacing-sm);
      border-radius: var(--border-radius-sm);
      text-align: center;
      font-size: var(--font-size-sm);

      &.success {
        background-color: #d4edda;
        color: #155724;
      }

      &:not(.success) {
        background-color: #f8d7da;
        color: #721c24;
      }
    }

    @media (max-width: 768px) {
      .contact-section {
        padding: var(--spacing-lg) var(--spacing-md);
      }

      .contact-info,
      .contact-form {
        padding: var(--spacing-lg);
      }
    }
  `]
})
export class ContactComponent implements OnInit {
  isRtl = false;
  contactForm: FormGroup;
  isSubmitting = false;
  submitMessage = '';
  submitSuccess = false;

  // Contact Information
  contactEmail = 'contact@yaarabuda.com';
  contactPhone = '+972 50-000-0000';

  constructor(
    private translationService: TranslationService,
    private firebaseService: FirebaseService
  ) {
    this.translationService.currentLang$.subscribe(() => {
      this.isRtl = this.translationService.isRtl();
    });

    this.contactForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl(''),
      subject: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    // Check if we have an artwork ID in the query params
    // TODO: Implement auto-filling subject and message based on artwork
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  onSubmit() {
    if (this.contactForm.invalid) return;

    this.isSubmitting = true;
    this.submitMessage = '';

    this.firebaseService.submitContactForm(this.contactForm.value).subscribe({
      next: () => {
        this.submitSuccess = true;
        this.submitMessage = this.translate('contact.form.success');
        this.contactForm.reset();
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Error submitting form:', error);
        this.submitSuccess = false;
        this.submitMessage = this.translate('contact.form.error');
        this.isSubmitting = false;
      }
    });
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }
}
