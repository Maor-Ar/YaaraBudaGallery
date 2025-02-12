import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { LanguageSwitcherComponent } from '../shared/language-switcher/language-switcher.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, LanguageSwitcherComponent],
  template: `
    <header class="header" [class.rtl]="isRtl">
      <div class="container">
        <a routerLink="/" class="logo">
          <img src="/assets/images/logo.png" alt="Yaara Buda Art">
        </a>

        <nav class="nav-menu">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
            {{ translate('nav.home') }}
          </a>
          <a routerLink="/gallery" routerLinkActive="active">
            {{ translate('nav.gallery') }}
          </a>
          <a routerLink="/contact" routerLinkActive="active">
            {{ translate('nav.contact') }}
          </a>
        </nav>

        <div class="right-section">
          <app-language-switcher></app-language-switcher>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background-color: var(--old-burgundy);
      padding: var(--spacing-md) 0;
      z-index: 1000;
      box-shadow: var(--shadow-md);

      &.rtl {
        .container {
          direction: rtl;
        }

        .nav-menu {
          margin-left: 0;
          margin-right: var(--spacing-xl);
        }

        .right-section {
          margin-left: 0;
          margin-right: auto;
        }
      }
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--spacing-md);
      display: flex;
      align-items: center;
    }

    .logo {
      display: block;
      
      img {
        height: 40px;
        width: auto;
      }
    }

    .nav-menu {
      display: flex;
      gap: var(--spacing-lg);
      margin-left: var(--spacing-xl);

      a {
        color: var(--gray-light);
        text-decoration: none;
        font-size: var(--font-size-md);
        padding: var(--spacing-xs) var(--spacing-sm);
        border-radius: var(--border-radius-sm);
        transition: all var(--transition-speed) var(--transition-ease);

        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        &.active {
          background: var(--mystic);
          color: var(--old-burgundy);
        }
      }
    }

    .right-section {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
    }

    @media (max-width: 768px) {
      .header {
        padding: var(--spacing-sm) 0;
      }

      .container {
        flex-wrap: wrap;
        justify-content: space-between;
      }

      .nav-menu {
        order: 3;
        width: 100%;
        margin: var(--spacing-md) 0 0;
        justify-content: center;
      }

      .right-section {
        margin-left: 0;
      }

      &.rtl {
        .right-section {
          margin-right: 0;
        }
      }
    }
  `]
})
export class HeaderComponent {
  isRtl: boolean = false;

  constructor(private translationService: TranslationService) {
    this.translationService.currentLang$.subscribe(() => {
      this.isRtl = this.translationService.isRtl();
    });
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }
}
