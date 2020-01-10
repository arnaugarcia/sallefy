import { AfterViewInit, Component, ElementRef, Renderer, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from 'app/core/login/login.service';

@Component({
  selector: 'sf-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('username', { static: false })
  username?: ElementRef;

  authenticationError = false;

  loginForm = this.fb.group({
    username: [''],
    password: [''],
    rememberMe: [false]
  });

  constructor(private loginService: LoginService, private renderer: Renderer, private router: Router, private fb: FormBuilder) {}

  ngAfterViewInit(): void {
    if (this.username) {
      this.renderer.invokeElementMethod(this.username.nativeElement, 'focus', []);
    }
  }

  cancel(): void {
    this.authenticationError = false;
    this.loginForm.patchValue({
      username: '',
      password: ''
    });
  }

  login(): void {
    this.loginService
      .login({
        username: this.loginForm.get('username')!.value,
        password: this.loginForm.get('password')!.value,
        rememberMe: this.loginForm.get('rememberMe')!.value
      })
      .subscribe(
        () => {
          this.authenticationError = false;
          this.router.navigate(['/']);
        },
        () => (this.authenticationError = true)
      );
  }
}
