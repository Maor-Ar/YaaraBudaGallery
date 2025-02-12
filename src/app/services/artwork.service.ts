import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Artwork {
  id: number;
  title: string;
  description?: string;
  imageUrl: string;
  category: string;
  price?: number;
  dimensions?: string;
  medium?: string;
  year?: number;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {
  private artworks: BehaviorSubject<Artwork[]> = new BehaviorSubject<Artwork[]>([
    {
      id: 1,
      title: 'Desert Sunset',
      description: 'A vibrant sunset over the Negev desert',
      imageUrl: '/assets/images/artworks/desert-sunset.jpg',
      category: 'Landscape',
      price: 2500,
      dimensions: '60x80 cm',
      medium: 'Oil on canvas',
      year: 2024,
      isAvailable: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: 2,
      title: 'Tel Aviv Nights',
      description: 'The bustling nightlife of Tel Aviv',
      imageUrl: '/assets/images/artworks/tel-aviv-nights.jpg',
      category: 'Urban',
      price: 3000,
      dimensions: '70x100 cm',
      medium: 'Acrylic on canvas',
      year: 2024,
      isAvailable: true,
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01')
    }
  ]);

  constructor() {}

  getArtworks(): Observable<Artwork[]> {
    return this.artworks.asObservable();
  }

  getArtworkById(id: number): Promise<Artwork | null> {
    return new Promise((resolve) => {
      const artwork = this.artworks.value.find(a => a.id === id);
      resolve(artwork || null);
    });
  }

  addArtwork(artwork: Omit<Artwork, 'id' | 'createdAt' | 'updatedAt'>): Promise<Artwork> {
    return new Promise((resolve) => {
      const newArtwork: Artwork = {
        ...artwork,
        id: this.getNextId(),
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const currentArtworks = this.artworks.value;
      this.artworks.next([...currentArtworks, newArtwork]);
      resolve(newArtwork);
    });
  }

  updateArtwork(id: number, updates: Partial<Artwork>): Promise<Artwork> {
    return new Promise((resolve, reject) => {
      const currentArtworks = this.artworks.value;
      const index = currentArtworks.findIndex(a => a.id === id);

      if (index === -1) {
        reject(new Error('Artwork not found'));
        return;
      }

      const updatedArtwork: Artwork = {
        ...currentArtworks[index],
        ...updates,
        updatedAt: new Date()
      };

      currentArtworks[index] = updatedArtwork;
      this.artworks.next([...currentArtworks]);
      resolve(updatedArtwork);
    });
  }

  deleteArtwork(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const currentArtworks = this.artworks.value;
      const index = currentArtworks.findIndex(a => a.id === id);

      if (index === -1) {
        reject(new Error('Artwork not found'));
        return;
      }

      currentArtworks.splice(index, 1);
      this.artworks.next([...currentArtworks]);
      resolve();
    });
  }

  searchArtworks(query: string): Observable<Artwork[]> {
    return this.artworks.pipe(
      map(artworks => {
        const lowercaseQuery = query.toLowerCase();
        return artworks.filter(artwork =>
          artwork.title.toLowerCase().includes(lowercaseQuery) ||
          artwork.description?.toLowerCase().includes(lowercaseQuery) ||
          artwork.category.toLowerCase().includes(lowercaseQuery)
        );
      })
    );
  }

  filterArtworks(filters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    year?: number;
    isAvailable?: boolean;
  }): Observable<Artwork[]> {
    return this.artworks.pipe(
      map(artworks => {
        return artworks.filter(artwork => {
          let matches = true;

          if (filters.category && artwork.category !== filters.category) {
            matches = false;
          }

          if (filters.minPrice && (!artwork.price || artwork.price < filters.minPrice)) {
            matches = false;
          }

          if (filters.maxPrice && (!artwork.price || artwork.price > filters.maxPrice)) {
            matches = false;
          }

          if (filters.year && artwork.year !== filters.year) {
            matches = false;
          }

          if (filters.isAvailable !== undefined && artwork.isAvailable !== filters.isAvailable) {
            matches = false;
          }

          return matches;
        });
      })
    );
  }

  inquireAboutArtwork(id: number, inquiry: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const currentArtworks = this.artworks.value;
      const index = currentArtworks.findIndex(a => a.id === id);

      if (index === -1) {
        reject(new Error('Artwork not found'));
        return;
      }

      const artwork = currentArtworks[index];
      // Send inquiry to artist or gallery owner
      console.log(`Inquiry about artwork ${artwork.title}: ${inquiry}`);
      resolve();
    });
  }

  private getNextId(): number {
    const currentArtworks = this.artworks.value;
    return currentArtworks.length > 0
      ? Math.max(...currentArtworks.map(a => a.id)) + 1
      : 1;
  }
}
