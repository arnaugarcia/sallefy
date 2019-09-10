import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFollowUser } from 'app/shared/model/follow-user.model';

@Component({
  selector: 'jhi-follow-user-detail',
  templateUrl: './follow-user-detail.component.html'
})
export class FollowUserDetailComponent implements OnInit {
  followUser: IFollowUser;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ followUser }) => {
      this.followUser = followUser;
    });
  }

  previousState() {
    window.history.back();
  }
}
