import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLazyImage]',
  standalone: true
})
export class LazyImageDirective implements OnInit {
  @Input() src!: string;
  @Input() alt: string = '';
  @Input() loadingClass: string = 'image-loading';
  @Input() loadedClass: string = 'image-loaded';
  @Input() errorClass: string = 'image-error';

  private observer!: IntersectionObserver;
  private hasLoaded: boolean = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.setupIntersectionObserver();
    this.addLoadingState();
  }

  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '50px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasLoaded) {
          this.loadImage();
        }
      });
    }, options);

    this.observer.observe(this.el.nativeElement);
  }

  private addLoadingState() {
    this.renderer.addClass(this.el.nativeElement, this.loadingClass);
  }

  private loadImage() {
    const img = new Image();
    
    img.onload = () => {
      this.renderer.removeClass(this.el.nativeElement, this.loadingClass);
      this.renderer.addClass(this.el.nativeElement, this.loadedClass);
      this.setImage(img.src);
      this.hasLoaded = true;
      this.observer.disconnect();
    };

    img.onerror = () => {
      this.renderer.removeClass(this.el.nativeElement, this.loadingClass);
      this.renderer.addClass(this.el.nativeElement, this.errorClass);
      this.observer.disconnect();
    };

    img.src = this.src;
  }

  private setImage(src: string) {
    if (this.el.nativeElement.tagName.toLowerCase() === 'img') {
      this.renderer.setAttribute(this.el.nativeElement, 'src', src);
    } else {
      this.renderer.setStyle(
        this.el.nativeElement,
        'background-image',
        `url(${src})`
      );
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
