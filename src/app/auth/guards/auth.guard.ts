import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, tap, of, map, catchError } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthState } from '../store/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private readonly router: Router, private readonly store: Store) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select(selectAuthState).pipe(
      map((state) => {
        if (!state.authenticatedUser) {
          this.router.navigate(['auth', 'login']);
        }

        return !!state.authenticatedUser;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }
}
