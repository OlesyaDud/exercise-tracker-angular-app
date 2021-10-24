import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {

  isAuth!: boolean;
  authSubscr!: Subscription
  
  @Output() closeSideNav = new EventEmitter<void>();

  constructor(private authServ: AuthService) { }

  ngOnInit(){
    this.authSubscr = this.authServ.authChange.subscribe(authStatus => {
      this.isAuth = authStatus; 
    });
  }

  onClose() {
    this.closeSideNav.emit();
  }

  onLogout() {
    this.onClose();
    this.authServ.logout();
  }

}
