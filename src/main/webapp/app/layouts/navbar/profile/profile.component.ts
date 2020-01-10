import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/core/auth/account.service';
import { LoginService } from 'app/core/login/login.service';
import { Router } from '@angular/router';
import { Account } from 'app/core/user/account.model';

@Component({
  selector: 'sf-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentAccount: Account | null = null;
  show = false;

  constructor(private accountService: AccountService, private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.accountService.identity().subscribe((account: Account | null) => {
      this.currentAccount = account;
    });
  }

  toggleShowProfile(): void {
    this.show = !this.show;
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  logout(): void {
    this.show = false;
    this.loginService.logout();
    this.router.navigate(['/account/login']);
  }

  getImageUrl(): string | null {
    return this.isAuthenticated() ? this.accountService.getImageUrl() : null;
  }
}
