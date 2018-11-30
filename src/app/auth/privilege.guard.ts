import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import decode from 'jwt-decode';

@Injectable()
export class PrivilegeGuard implements CanActivate {

    constructor(private router: Router) {
    }
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        const token = localStorage.getItem('AuthToken');
        const decodedToken = decode(token).valueOf().scopes[0].authority;
        console.log(decodedToken);
    
      if (decodedToken === 'ROLE_ADMIN') {
        // for a while only rode admin check
        return true;
      }
      // not admin
      this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
      return false;
    }
  }