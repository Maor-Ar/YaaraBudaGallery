import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { LanguageSwitcherComponent } from '../shared/language-switcher/language-switcher.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, LanguageSwitcherComponent]
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
