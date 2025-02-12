import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService, Language } from '../../../services/translation.service';

@Component({
    selector: 'app-language-switcher',
    imports: [CommonModule],
    template: `
    <div class="language-switcher" [class.rtl]="isRtl">
      <button
        class="lang-btn"
        [class.active]="currentLang === 'en'"
        (click)="switchLanguage('en')"
      >
        EN
      </button>
      <span class="separator">|</span>
      <button
        class="lang-btn"
        [class.active]="currentLang === 'he'"
        (click)="switchLanguage('he')"
      >
        עב
      </button>
    </div>
  `,
    styles: [`
    .language-switcher {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      padding: var(--spacing-xs);
      background: rgba(255, 255, 255, 0.1);
      border-radius: var(--border-radius-sm);

      &.rtl {
        direction: rtl;
      }

      .lang-btn {
        background: none;
        border: none;
        color: var(--gray-light);
        padding: var(--spacing-xs) var(--spacing-sm);
        cursor: pointer;
        font-size: var(--font-size-sm);
        transition: all var(--transition-speed) var(--transition-ease);
        border-radius: var(--border-radius-xs);

        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        &.active {
          background: var(--mystic);
          color: var(--old-burgundy);
        }
      }

      .separator {
        color: var(--gray-light);
        opacity: 0.5;
      }
    }
  `]
})
export class LanguageSwitcherComponent implements OnInit {
  currentLang: Language = 'en';
  isRtl: boolean = false;

  constructor(private translationService: TranslationService) {}

  ngOnInit() {
    this.translationService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
      this.isRtl = this.translationService.isRtl();
    });
  }

  switchLanguage(lang: Language) {
    this.translationService.setLanguage(lang);
  }
}
