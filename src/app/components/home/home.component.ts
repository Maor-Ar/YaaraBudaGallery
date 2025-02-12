import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { ArtworkService, Artwork } from '../../services/artwork.service';
import { LazyImageDirective } from '../../directives/lazy-image.directive';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, LazyImageDirective, LoadingSpinnerComponent],
  template: `
    <main class="home-page" [class.rtl]="isRtl">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <h1>{{ translate('home.hero.title') }}</h1>
          <p>{{ translate('home.hero.subtitle') }}</p>
          <a routerLink="/gallery" class="cta-button">
            {{ translate('home.hero.cta') }}
          </a>
        </div>
      </section>

      <!-- Featured Works -->
      <section class="featured-works">
        <div class="container">
          <h2>{{ translate('home.featured.title') }}</h2>
          
          <div *ngIf="isLoading" class="loading-container">
            <app-loading-spinner></app-loading-spinner>
          </div>

          <div *ngIf="error" class="error-message">
            {{ error }}
          </div>

          <div *ngIf="!isLoading && !error" class="artwork-grid">
            <div *ngFor="let artwork of featuredArtworks" class="artwork-card">
              <div class="artwork-image">
                <img [appLazyImage]="artwork.imageUrl" [alt]="artwork.title">
                <div class="artwork-overlay">
                  <a [routerLink]="['/gallery']" [queryParams]="{artworkId: artwork.id}" class="view-button">
                    {{ translate('home.featured.viewDetails') }}
                  </a>
                </div>
              </div>
              <div class="artwork-info">
                <h3>{{ artwork.title }}</h3>
                <p class="category">{{ artwork.category }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- About Artist -->
      <section class="about-artist">
        <div class="container">
          <div class="artist-content">
            <div class="artist-image">
              <img src="/assets/images/artist.jpg" alt="Yaara Buda">
            </div>
            <div class="artist-info">
              <h2>{{ translate('home.about.title') }}</h2>
              <p>{{ translate('home.about.description') }}</p>
              <div class="artist-quote">
                <blockquote>
                  {{ translate('home.about.quote') }}
                </blockquote>
              </div>
              <a routerLink="/contact" class="contact-button">
                {{ translate('home.about.contact') }}
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Latest News -->
      <section class="latest-news">
        <div class="container">
          <h2>{{ translate('home.news.title') }}</h2>
          <div class="news-grid">
            <article class="news-card">
              <div class="news-image">
                <img src="/assets/images/news/exhibition.jpg" alt="Exhibition">
              </div>
              <div class="news-content">
                <h3>{{ translate('home.news.exhibition.title') }}</h3>
                <p>{{ translate('home.news.exhibition.description') }}</p>
                <a href="#" class="read-more">
                  {{ translate('home.news.readMore') }}
                </a>
              </div>
            </article>
            <article class="news-card">
              <div class="news-image">
                <img src="/assets/images/news/workshop.jpg" alt="Workshop">
              </div>
              <div class="news-content">
                <h3>{{ translate('home.news.workshop.title') }}</h3>
                <p>{{ translate('home.news.workshop.description') }}</p>
                <a href="#" class="read-more">
                  {{ translate('home.news.readMore') }}
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  `,
  styles: [`
    .home-page {
      &.rtl {
        direction: rtl;
        text-align: right;

        .hero-content,
        .artist-info,
        .news-content {
          text-align: right;
        }
      }
    }

    .hero {
      height: 100vh;
      background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/assets/images/hero-bg.jpg');
      background-size: cover;
      background-position: center;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: white;
      margin-top: -64px; // Compensate for header height

      .hero-content {
        max-width: 800px;
        padding: var(--spacing-xl);

        h1 {
          font-size: var(--font-size-3xl);
          margin-bottom: var(--spacing-lg);
          font-weight: 700;
        }

        p {
          font-size: var(--font-size-xl);
          margin-bottom: var(--spacing-xl);
          opacity: 0.9;
        }

        .cta-button {
          display: inline-block;
          padding: var(--spacing-md) var(--spacing-xl);
          background-color: var(--mystic);
          color: var(--old-burgundy);
          text-decoration: none;
          border-radius: var(--border-radius-md);
          font-weight: 600;
          transition: all var(--transition-speed) var(--transition-ease);

          &:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-md);
          }
        }
      }
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--spacing-md);
    }

    .featured-works {
      padding: var(--spacing-3xl) 0;
      background-color: var(--gray-light);

      h2 {
        text-align: center;
        color: var(--old-burgundy);
        margin-bottom: var(--spacing-xl);
        font-size: var(--font-size-2xl);
      }

      .artwork-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: var(--spacing-lg);
      }

      .artwork-card {
        background: white;
        border-radius: var(--border-radius-lg);
        overflow: hidden;
        box-shadow: var(--shadow-md);
        transition: transform var(--transition-speed) var(--transition-ease);

        &:hover {
          transform: translateY(-4px);

          .artwork-overlay {
            opacity: 1;
          }
        }

        .artwork-image {
          position: relative;
          aspect-ratio: 3/4;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .artwork-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity var(--transition-speed) var(--transition-ease);

            .view-button {
              padding: var(--spacing-sm) var(--spacing-lg);
              background-color: var(--mystic);
              color: var(--old-burgundy);
              text-decoration: none;
              border-radius: var(--border-radius-sm);
              font-weight: 500;
            }
          }
        }

        .artwork-info {
          padding: var(--spacing-md);

          h3 {
            color: var(--old-burgundy);
            margin-bottom: var(--spacing-xs);
          }

          .category {
            color: var(--gray-dark);
            font-size: var(--font-size-sm);
          }
        }
      }
    }

    .about-artist {
      padding: var(--spacing-3xl) 0;
      background-color: white;

      .artist-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--spacing-xl);
        align-items: center;

        @media (max-width: 768px) {
          grid-template-columns: 1fr;
        }
      }

      .artist-image {
        img {
          width: 100%;
          height: auto;
          border-radius: var(--border-radius-lg);
          box-shadow: var(--shadow-lg);
        }
      }

      .artist-info {
        h2 {
          color: var(--old-burgundy);
          margin-bottom: var(--spacing-lg);
          font-size: var(--font-size-2xl);
        }

        p {
          color: var(--gray-dark);
          margin-bottom: var(--spacing-lg);
          line-height: 1.6;
        }

        .artist-quote {
          margin: var(--spacing-xl) 0;
          padding: var(--spacing-lg);
          border-left: 4px solid var(--mystic);
          background-color: var(--gray-light);
          border-radius: var(--border-radius-sm);

          blockquote {
            font-style: italic;
            color: var(--old-burgundy);
            font-size: var(--font-size-lg);
          }

          .rtl & {
            border-left: none;
            border-right: 4px solid var(--mystic);
          }
        }

        .contact-button {
          display: inline-block;
          padding: var(--spacing-sm) var(--spacing-xl);
          background-color: var(--old-burgundy);
          color: white;
          text-decoration: none;
          border-radius: var(--border-radius-md);
          transition: all var(--transition-speed) var(--transition-ease);

          &:hover {
            background-color: var(--mystic);
            color: var(--old-burgundy);
          }
        }
      }
    }

    .latest-news {
      padding: var(--spacing-3xl) 0;
      background-color: var(--gray-light);

      h2 {
        text-align: center;
        color: var(--old-burgundy);
        margin-bottom: var(--spacing-xl);
        font-size: var(--font-size-2xl);
      }

      .news-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: var(--spacing-lg);
      }

      .news-card {
        background: white;
        border-radius: var(--border-radius-lg);
        overflow: hidden;
        box-shadow: var(--shadow-md);
        transition: transform var(--transition-speed) var(--transition-ease);

        &:hover {
          transform: translateY(-4px);
        }

        .news-image {
          img {
            width: 100%;
            height: 200px;
            object-fit: cover;
          }
        }

        .news-content {
          padding: var(--spacing-lg);

          h3 {
            color: var(--old-burgundy);
            margin-bottom: var(--spacing-sm);
          }

          p {
            color: var(--gray-dark);
            margin-bottom: var(--spacing-md);
            line-height: 1.6;
          }

          .read-more {
            color: var(--mystic);
            text-decoration: none;
            font-weight: 500;
            transition: color var(--transition-speed) var(--transition-ease);

            &:hover {
              color: var(--old-burgundy);
            }
          }
        }
      }
    }

    .loading-container {
      display: flex;
      justify-content: center;
      padding: var(--spacing-xl);
    }

    .error-message {
      text-align: center;
      color: #dc3545;
      padding: var(--spacing-xl);
    }
  `]
})
export class HomeComponent implements OnInit {
  featuredArtworks: Artwork[] = [];
  isLoading: boolean = true;
  error: string = '';
  isRtl: boolean = false;

  constructor(
    private artworkService: ArtworkService,
    private translationService: TranslationService
  ) {
    this.translationService.currentLang$.subscribe(() => {
      this.isRtl = this.translationService.isRtl();
    });
  }

  ngOnInit() {
    this.loadFeaturedArtworks();
  }

  private loadFeaturedArtworks() {
    this.isLoading = true;
    this.error = '';

    this.artworkService.getArtworks().subscribe({
      next: (artworks) => {
        // Get the 3 most recent available artworks
        this.featuredArtworks = artworks
          .filter(a => a.isAvailable)
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
          .slice(0, 3);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading featured artworks:', error);
        this.error = this.translate('home.featured.error');
        this.isLoading = false;
      }
    });
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }
}
