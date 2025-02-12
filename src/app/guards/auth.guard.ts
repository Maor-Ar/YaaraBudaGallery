import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.firebaseService.isLoggedIn().pipe(
      take(1),
      map(isLoggedIn => {
        if (!isLoggedIn) {
          this.router.navigate(['/admin/login']);
          return false;
        }
        return true;
      })
    );
  }
}
