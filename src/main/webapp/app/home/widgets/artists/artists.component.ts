import { Component, OnInit } from '@angular/core';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'sf-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {
  users: IUser[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.query({ notFollowing: true, size: 5 }).subscribe((response: HttpResponse<IUser[]>) => {
      this.users = response.body != null ? response.body : [];
    });
  }

  follow(user: IUser): void {
    this.userService.follow(user).subscribe();
  }
}
