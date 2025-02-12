import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FirebaseService } from '../../../services/firebase.service';
import { TranslationService } from '../../../services/translation.service';
import { ArtworkService, Artwork } from '../../../services/artwork.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-container" [class.rtl]="isRtl">
      <header class="dashboard-header">
        <h1>{{ translate('admin.dashboard.title') }}</h1>
        <div class="user-controls">
          <span class="welcome-text">{{ translate('admin.dashboard.welcome') }}</span>
          <button class="logout-button" (click)="logout()">
            {{ translate('admin.dashboard.logout') }}
          </button>
        </div>
      </header>

      <div class="dashboard-content">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-palette"></i>
            </div>
            <div class="stat-info">
              <h3>{{ translate('admin.dashboard.totalArtworks') }}</h3>
              <p class="stat-value">{{ artworksCount }}</p>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-shopping-cart"></i>
            </div>
            <div class="stat-info">
              <h3>{{ translate('admin.dashboard.availableArtworks') }}</h3>
              <p class="stat-value">{{ availableArtworksCount }}</p>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">
              <i class="fas fa-envelope"></i>
            </div>
            <div class="stat-info">
              <h3>{{ translate('admin.dashboard.newInquiries') }}</h3>
              <p class="stat-value">{{ newInquiriesCount }}</p>
            </div>
          </div>
        </div>

        <div class="actions-grid">
          <div class="action-card" routerLink="/admin/artworks">
            <div class="action-icon">
              <i class="fas fa-images"></i>
            </div>
            <h3>{{ translate('admin.dashboard.manageArtworks') }}</h3>
            <p>{{ translate('admin.dashboard.manageArtworksDesc') }}</p>
          </div>

          <div class="action-card" routerLink="/admin/inquiries">
            <div class="action-icon">
              <i class="fas fa-inbox"></i>
            </div>
            <h3>{{ translate('admin.dashboard.manageInquiries') }}</h3>
            <p>{{ translate('admin.dashboard.manageInquiriesDesc') }}</p>
          </div>

          <div class="action-card" routerLink="/admin/news">
            <div class="action-icon">
              <i class="fas fa-newspaper"></i>
            </div>
            <h3>{{ translate('admin.dashboard.manageNews') }}</h3>
            <p>{{ translate('admin.dashboard.manageNewsDesc') }}</p>
          </div>

          <div class="action-card" routerLink="/admin/settings">
            <div class="action-icon">
              <i class="fas fa-cog"></i>
            </div>
            <h3>{{ translate('admin.dashboard.settings') }}</h3>
            <p>{{ translate('admin.dashboard.settingsDesc') }}</p>
          </div>
        </div>

        <div class="recent-section">
          <h2>{{ translate('admin.dashboard.recentActivity') }}</h2>
          
          <div class="activity-list" *ngIf="!isLoading; else loadingTpl">
            <div class="activity-item" *ngFor="let activity of recentActivities">
              <div class="activity-icon" [ngClass]="activity.type">
                <i [class]="getActivityIcon(activity.type)"></i>
              </div>
              <div class="activity-content">
                <p class="activity-text">{{ activity.description }}</p>
                <span class="activity-time">{{ activity.timestamp | date:'medium' }}</span>
              </div>
            </div>
          </div>

          <ng-template #loadingTpl>
            <div class="loading-spinner">
              <div class="spinner"></div>
            </div>
          </ng-template>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      min-height: 100vh;
      background-color: var(--gray-light);
      padding: var(--spacing-lg);

      &.rtl {
        direction: rtl;

        .dashboard-header,
        .stat-card,
        .action-card,
        .activity-item {
          text-align: right;
        }

        .user-controls {
          margin-left: 0;
          margin-right: auto;
        }

        .activity-icon {
          margin-right: 0;
          margin-left: var(--spacing-md);
        }
      }
    }

    .dashboard-header {
      background: white;
      padding: var(--spacing-lg);
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-md);
      margin-bottom: var(--spacing-xl);
      display: flex;
      align-items: center;

      h1 {
        color: var(--old-burgundy);
        margin: 0;
        font-size: var(--font-size-2xl);
      }

      .user-controls {
        margin-left: auto;
        display: flex;
        align-items: center;
        gap: var(--spacing-md);

        .welcome-text {
          color: var(--gray-dark);
        }

        .logout-button {
          padding: var(--spacing-sm) var(--spacing-md);
          background-color: var(--old-burgundy);
          color: white;
          border: none;
          border-radius: var(--border-radius-sm);
          cursor: pointer;
          transition: all var(--transition-speed) var(--transition-ease);

          &:hover {
            background-color: var(--mystic);
            color: var(--old-burgundy);
          }
        }
      }
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: var(--spacing-lg);
      margin-bottom: var(--spacing-xl);
    }

    .stat-card {
      background: white;
      padding: var(--spacing-lg);
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-md);
      display: flex;
      align-items: center;
      gap: var(--spacing-md);

      .stat-icon {
        width: 48px;
        height: 48px;
        background-color: var(--mystic);
        border-radius: var(--border-radius-md);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--old-burgundy);
        font-size: var(--font-size-xl);
      }

      .stat-info {
        h3 {
          color: var(--gray-dark);
          font-size: var(--font-size-sm);
          margin: 0;
        }

        .stat-value {
          color: var(--old-burgundy);
          font-size: var(--font-size-2xl);
          font-weight: 700;
          margin: var(--spacing-xs) 0 0;
        }
      }
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: var(--spacing-lg);
      margin-bottom: var(--spacing-xl);
    }

    .action-card {
      background: white;
      padding: var(--spacing-xl);
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-md);
      cursor: pointer;
      transition: all var(--transition-speed) var(--transition-ease);

      &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
      }

      .action-icon {
        width: 48px;
        height: 48px;
        background-color: var(--mystic);
        border-radius: var(--border-radius-md);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--old-burgundy);
        font-size: var(--font-size-xl);
        margin-bottom: var(--spacing-md);
      }

      h3 {
        color: var(--old-burgundy);
        margin: 0 0 var(--spacing-sm);
        font-size: var(--font-size-lg);
      }

      p {
        color: var(--gray-dark);
        margin: 0;
        font-size: var(--font-size-sm);
      }
    }

    .recent-section {
      background: white;
      padding: var(--spacing-xl);
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-md);

      h2 {
        color: var(--old-burgundy);
        margin: 0 0 var(--spacing-lg);
        font-size: var(--font-size-xl);
      }
    }

    .activity-list {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
    }

    .activity-item {
      display: flex;
      align-items: flex-start;
      padding: var(--spacing-md);
      border-radius: var(--border-radius-md);
      background-color: var(--gray-light);

      .activity-icon {
        width: 32px;
        height: 32px;
        border-radius: var(--border-radius-sm);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: var(--spacing-md);
        color: white;

        &.artwork { background-color: #4CAF50; }
        &.inquiry { background-color: #2196F3; }
        &.news { background-color: #FF9800; }
        &.settings { background-color: #9C27B0; }
      }

      .activity-content {
        flex: 1;

        .activity-text {
          margin: 0;
          color: var(--old-burgundy);
        }

        .activity-time {
          font-size: var(--font-size-sm);
          color: var(--gray-dark);
        }
      }
    }

    .loading-spinner {
      display: flex;
      justify-content: center;
      padding: var(--spacing-xl);

      .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-left-color: var(--old-burgundy);
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    @media (max-width: 768px) {
      .dashboard-container {
        padding: var(--spacing-md);
      }

      .dashboard-header {
        flex-direction: column;
        text-align: center;
        gap: var(--spacing-md);

        .user-controls {
          margin: 0;
          flex-direction: column;
          width: 100%;

          .logout-button {
            width: 100%;
          }
        }
      }

      .stats-grid,
      .actions-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  isRtl = false;
  isLoading = true;
  artworksCount = 0;
  availableArtworksCount = 0;
  newInquiriesCount = 0;
  recentActivities: any[] = [];

  constructor(
    private firebaseService: FirebaseService,
    private artworkService: ArtworkService,
    private translationService: TranslationService
  ) {
    this.translationService.currentLang$.subscribe(() => {
      this.isRtl = this.translationService.isRtl();
    });
  }

  ngOnInit() {
    this.loadDashboardData();
  }

  private loadDashboardData() {
    this.isLoading = true;

    // Load artworks statistics
    this.artworkService.getArtworks().subscribe({
      next: (artworks) => {
        this.artworksCount = artworks.length;
        this.availableArtworksCount = artworks.filter(a => a.isAvailable).length;
      },
      error: (error) => {
        console.error('Error loading artworks:', error);
      }
    });

    // Load inquiries count
    this.firebaseService.getNewInquiriesCount().subscribe({
      next: (count) => {
        this.newInquiriesCount = count;
      },
      error: (error) => {
        console.error('Error loading inquiries count:', error);
      }
    });

    // Load recent activities
    this.firebaseService.getRecentActivities().subscribe({
      next: (activities) => {
        this.recentActivities = activities;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading recent activities:', error);
        this.isLoading = false;
      }
    });
  }

  getActivityIcon(type: string): string {
    switch (type) {
      case 'artwork': return 'fas fa-palette';
      case 'inquiry': return 'fas fa-envelope';
      case 'news': return 'fas fa-newspaper';
      case 'settings': return 'fas fa-cog';
      default: return 'fas fa-info-circle';
    }
  }

  logout() {
    this.firebaseService.logout().subscribe({
      next: () => {
        // Router navigation will be handled by the auth guard
      },
      error: (error) => {
        console.error('Error logging out:', error);
      }
    });
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }
}
