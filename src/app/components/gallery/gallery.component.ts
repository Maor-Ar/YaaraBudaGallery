import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtworkService, Artwork } from '../../services/artwork.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="gallery-section" [class.rtl]="isRtl">
      <div class="section-header">
        <h2>{{ translate('gallery.title') }}</h2>
        <p class="section-description">{{ translate('gallery.description') }}</p>
      </div>

      <div class="gallery-grid">
        <div *ngFor="let artwork of currentPageArtworks" class="artwork-card" (click)="openFullscreen(artwork)">
          <div class="artwork-image">
            <img [src]="artwork.imageUrl" [alt]="artwork.title" loading="lazy">
            <div class="artwork-overlay">
              <span class="view-icon">
                <i class="fas fa-search-plus"></i>
              </span>
            </div>
          </div>
          <div class="artwork-info">
            <h3>{{ artwork.title }}</h3>
            <p class="artwork-description">{{ artwork.description }}</p>
            <div class="artwork-actions">
              <span class="artwork-price" *ngIf="artwork.price">
                {{ artwork.price | currency }}
              </span>
              <button class="contact-button" (click)="contactForPurchase($event, artwork)">
                {{ translate('gallery.contactForPurchase') }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="pagination-controls">
        <button 
          class="pagination-button" 
          [disabled]="currentPage === 0"
          (click)="previousPage()">
          <i class="fas fa-chevron-left"></i>
        </button>
        <span class="page-info">
          {{ currentPage + 1 }} / {{ totalPages }}
        </span>
        <button 
          class="pagination-button" 
          [disabled]="currentPage >= totalPages - 1"
          (click)="nextPage()">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>

      <!-- Fullscreen Modal -->
      <div class="fullscreen-modal" *ngIf="selectedArtwork" (click)="closeFullscreen()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <button class="close-button" (click)="closeFullscreen()">
            <i class="fas fa-times"></i>
          </button>
          <div class="modal-image">
            <img [src]="selectedArtwork.imageUrl" [alt]="selectedArtwork.title">
          </div>
          <div class="modal-info">
            <h3>{{ selectedArtwork.title }}</h3>
            <p>{{ selectedArtwork.description }}</p>
            <div class="modal-actions">
              <span class="artwork-price" *ngIf="selectedArtwork.price">
                {{ selectedArtwork.price | currency }}
              </span>
              <button class="contact-button" (click)="contactForPurchase($event, selectedArtwork)">
                {{ translate('gallery.contactForPurchase') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .gallery-section {
      padding: var(--spacing-xl) var(--spacing-lg);
      background-color: var(--gray-light);

      &.rtl {
        direction: rtl;
        text-align: right;

        .artwork-info,
        .modal-info {
          text-align: right;
        }

        .pagination-controls {
          flex-direction: row-reverse;
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

    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: var(--spacing-lg);
      margin-bottom: var(--spacing-xl);
    }

    .artwork-card {
      background: white;
      border-radius: var(--border-radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-md);
      cursor: pointer;
      transition: transform var(--transition-speed) var(--transition-ease);

      &:hover {
        transform: translateY(-4px);

        .artwork-overlay {
          opacity: 1;
        }
      }
    }

    .artwork-image {
      position: relative;
      aspect-ratio: 1;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform var(--transition-speed) var(--transition-ease);
      }

      .artwork-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity var(--transition-speed) var(--transition-ease);

        .view-icon {
          color: white;
          font-size: var(--font-size-2xl);
        }
      }
    }

    .artwork-info {
      padding: var(--spacing-lg);

      h3 {
        color: var(--old-burgundy);
        margin: 0 0 var(--spacing-sm);
        font-size: var(--font-size-lg);
      }

      .artwork-description {
        color: var(--gray-dark);
        margin: 0 0 var(--spacing-md);
        font-size: var(--font-size-sm);
        line-height: 1.5;
      }
    }

    .artwork-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--spacing-md);

      .artwork-price {
        color: var(--mystic);
        font-weight: 600;
        font-size: var(--font-size-lg);
      }

      .contact-button {
        background-color: var(--old-burgundy);
        color: white;
        border: none;
        padding: var(--spacing-sm) var(--spacing-md);
        border-radius: var(--border-radius-sm);
        cursor: pointer;
        transition: background-color var(--transition-speed) var(--transition-ease);

        &:hover {
          background-color: var(--mystic);
        }
      }
    }

    .pagination-controls {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-md);

      .pagination-button {
        background: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: var(--border-radius-full);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all var(--transition-speed) var(--transition-ease);
        color: var(--old-burgundy);

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        &:not(:disabled):hover {
          background-color: var(--old-burgundy);
          color: white;
        }
      }

      .page-info {
        color: var(--gray-dark);
        font-size: var(--font-size-sm);
      }
    }

    .fullscreen-modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: var(--z-index-modal);
      padding: var(--spacing-lg);

      .modal-content {
        background: white;
        border-radius: var(--border-radius-lg);
        max-width: 90vw;
        max-height: 90vh;
        overflow: hidden;
        position: relative;
      }

      .close-button {
        position: absolute;
        top: var(--spacing-md);
        right: var(--spacing-md);
        background: none;
        border: none;
        color: white;
        font-size: var(--font-size-xl);
        cursor: pointer;
        z-index: 1;
        width: 40px;
        height: 40px;
        border-radius: var(--border-radius-full);
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.5);
        transition: background-color var(--transition-speed) var(--transition-ease);

        &:hover {
          background-color: var(--old-burgundy);
        }
      }

      .modal-image {
        max-height: 70vh;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      .modal-info {
        padding: var(--spacing-lg);
        background: white;

        h3 {
          color: var(--old-burgundy);
          margin: 0 0 var(--spacing-sm);
          font-size: var(--font-size-xl);
        }

        p {
          color: var(--gray-dark);
          margin: 0 0 var(--spacing-md);
          line-height: 1.6;
        }

        .modal-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--spacing-md);
        }
      }
    }

    @media (max-width: 768px) {
      .gallery-section {
        padding: var(--spacing-lg) var(--spacing-md);
      }

      .gallery-grid {
        grid-template-columns: 1fr;
      }

      .fullscreen-modal {
        padding: var(--spacing-md);

        .modal-content {
          width: 100%;
        }
      }
    }
  `]
})
export class GalleryComponent implements OnInit {
  artworks: Artwork[] = [];
  currentPage = 0;
  pageSize = 9;
  totalPages = 0;
  selectedArtwork: Artwork | null = null;
  isRtl = false;

  constructor(
    private artworkService: ArtworkService,
    private translationService: TranslationService
  ) {
    this.translationService.currentLang$.subscribe(() => {
      this.isRtl = this.translationService.isRtl();
    });
  }

  ngOnInit() {
    this.loadArtworks();
  }

  loadArtworks() {
    this.artworkService.getArtworks().subscribe({
      next: (artworks) => {
        this.artworks = artworks;
        this.totalPages = Math.ceil(this.artworks.length / this.pageSize);
      },
      error: (error) => {
        console.error('Error loading artworks:', error);
      }
    });
  }

  get currentPageArtworks(): Artwork[] {
    const start = this.currentPage * this.pageSize;
    return this.artworks.slice(start, start + this.pageSize);
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
    }
  }

  openFullscreen(artwork: Artwork) {
    this.selectedArtwork = artwork;
    document.body.style.overflow = 'hidden';
  }

  closeFullscreen() {
    this.selectedArtwork = null;
    document.body.style.overflow = '';
  }

  contactForPurchase(event: Event, artwork: Artwork) {
    event.stopPropagation();
    // TODO: Implement contact form opening
    console.log('Contact for purchase:', artwork);
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }
}
