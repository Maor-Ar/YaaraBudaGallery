import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="spinner-container" [class.overlay]="overlay">
      <div class="spinner" [style.width.px]="size" [style.height.px]="size">
        <svg viewBox="0 0 50 50">
          <circle
            class="path"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke-width="4"
          ></circle>
        </svg>
      </div>
    </div>
  `,
  styles: [`
    .spinner-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100px;

      &.overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(255, 255, 255, 0.8);
        z-index: 1000;
      }
    }

    .spinner {
      animation: rotate 2s linear infinite;
      transform-origin: center center;
      width: 50px;
      height: 50px;
    }

    .path {
      stroke: var(--spinner-color, #D34F73);
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -10;
      animation: dash 1.5s ease-in-out infinite;
    }

    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes dash {
      0% {
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -35;
      }
      100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -124;
      }
    }
  `]
})
export class LoadingSpinnerComponent {
  @Input() size: number = 50;
  @Input() overlay: boolean = false;
}
