import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILikeUser } from 'app/shared/model/like-user.model';

@Component({
  selector: 'jhi-like-user-detail',
  templateUrl: './like-user-detail.component.html'
})
export class LikeUserDetailComponent implements OnInit {
  likeUser: ILikeUser;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ likeUser }) => {
      this.likeUser = likeUser;
    });
  }

  previousState() {
    window.history.back();
  }
}
