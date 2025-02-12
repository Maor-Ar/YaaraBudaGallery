import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

interface Service {
  title: string;
  description: string;
  imageUrl: string;
  features: string[];
}

@Component({
    selector: 'app-services',
    imports: [CommonModule],
    template: `
    <section class="services-section" [class.rtl]="isRtl">
      <div class="section-header">
        <h2>{{ translate('services.title') }}</h2>
        <p class="section-description">{{ translate('services.description') }}</p>
      </div>

      <div class="services-container">
        <!-- Tattoo Sketch Service -->
        <div class="service-item">
          <div class="service-content">
            <h3>{{ translate('services.tattoo.title') }}</h3>
            <p>{{ translate('services.tattoo.description') }}</p>
            <ul class="service-features">
              <li *ngFor="let feature of translate('services.tattoo.features').split('|')">
                {{ feature }}
              </li>
            </ul>
            <button class="contact-button" (click)="contactForService('tattoo')">
              {{ translate('services.contact') }}
            </button>
          </div>
          <div class="service-image">
            <img src="assets/images/services/tattoo-sketch.jpg" alt="Tattoo Sketch Service">
          </div>
        </div>

        <!-- Event Cartoons Service -->
        <div class="service-item reverse">
          <div class="service-content">
            <h3>{{ translate('services.events.title') }}</h3>
            <p>{{ translate('services.events.description') }}</p>
            <ul class="service-features">
              <li *ngFor="let feature of translate('services.events.features').split('|')">
                {{ feature }}
              </li>
            </ul>
            <button class="contact-button" (click)="contactForService('events')">
              {{ translate('services.contact') }}
            </button>
          </div>
          <div class="service-image">
            <img src="assets/images/services/event-cartoons.jpg" alt="Event Cartoons Service">
          </div>
        </div>

        <!-- Custom Commissions Service -->
        <div class="service-item">
          <div class="service-content">
            <h3>{{ translate('services.commissions.title') }}</h3>
            <p>{{ translate('services.commissions.description') }}</p>
            <ul class="service-features">
              <li *ngFor="let feature of translate('services.commissions.features').split('|')">
                {{ feature }}
              </li>
            </ul>
            <button class="contact-button" (click)="contactForService('commissions')">
              {{ translate('services.contact') }}
            </button>
          </div>
          <div class="service-image">
            <img src="assets/images/services/custom-art.jpg" alt="Custom Art Commissions Service">
          </div>
        </div>
      </div>
    </section>
  `,
    styles: [`
    .services-section {
      padding: var(--spacing-xl) var(--spacing-lg);
      background-color: var(--gray-light);

      &.rtl {
        direction: rtl;
        text-align: right;

        .service-item.reverse {
          flex-direction: row;

          @media (max-width: 768px) {
            flex-direction: column;
          }
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

    .services-container {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xl);
    }

    .service-item {
      display: flex;
      gap: var(--spacing-xl);
      background: white;
      border-radius: var(--border-radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-md);

      &.reverse {
        flex-direction: row-reverse;

        @media (max-width: 768px) {
          flex-direction: column;
        }
      }

      @media (max-width: 768px) {
        flex-direction: column;
      }
    }

    .service-content {
      flex: 1;
      padding: var(--spacing-xl);
      display: flex;
      flex-direction: column;

      h3 {
        color: var(--old-burgundy);
        font-size: var(--font-size-2xl);
        margin: 0 0 var(--spacing-md);
      }

      p {
        color: var(--gray-dark);
        margin: 0 0 var(--spacing-lg);
        line-height: 1.6;
      }
    }

    .service-features {
      list-style: none;
      padding: 0;
      margin: 0 0 var(--spacing-lg);

      li {
        position: relative;
        padding-left: 1.5em;
        margin-bottom: var(--spacing-sm);
        color: var(--gray-dark);

        &:before {
          content: "•";
          color: var(--mystic);
          position: absolute;
          left: 0;
          font-size: 1.2em;
        }

        .rtl & {
          padding-left: 0;
          padding-right: 1.5em;

          &:before {
            left: auto;
            right: 0;
          }
        }
      }
    }

    .service-image {
      flex: 1;
      min-height: 400px;
      position: relative;
      overflow: hidden;

      img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform var(--transition-speed) var(--transition-ease);
      }

      &:hover img {
        transform: scale(1.05);
      }

      @media (max-width: 768px) {
        min-height: 300px;
      }
    }

    .contact-button {
      align-self: flex-start;
      background-color: var(--old-burgundy);
      color: white;
      border: none;
      padding: var(--spacing-sm) var(--spacing-lg);
      border-radius: var(--border-radius-sm);
      font-size: var(--font-size-md);
      cursor: pointer;
      transition: background-color var(--transition-speed) var(--transition-ease);

      &:hover {
        background-color: var(--mystic);
      }

      .rtl & {
        align-self: flex-end;
      }
    }

    @media (max-width: 768px) {
      .services-section {
        padding: var(--spacing-lg) var(--spacing-md);
      }

      .service-content {
        padding: var(--spacing-lg);
      }
    }
  `]
})
export class ServicesComponent {
  isRtl = false;

  constructor(private translationService: TranslationService) {
    this.translationService.currentLang$.subscribe(() => {
      this.isRtl = this.translationService.isRtl();
    });
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }

  contactForService(service: string) {
    // TODO: Implement contact form opening
    console.log('Contact for service:', service);
  }
}
