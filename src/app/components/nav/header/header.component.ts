import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth!: boolean;
  // to unsubscribe from service
  authSubscr!: Subscription

  constructor(private authServ: AuthService) { }


  ngOnInit() {
    // authStatus refers to authChange in auth service
    this.authSubscr = this.authServ.authChange.subscribe(authStatus => {
      // true if logged in, false if not
      this.isAuth = authStatus;
    });
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authServ.logout();
  }

  ngOnDestroy(){
    this.authSubscr.unsubscribe();
  }

}
