import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SallefySharedModule } from 'app/shared/shared.module';
import { FollowUserComponent } from './follow-user.component';
import { FollowUserDetailComponent } from './follow-user-detail.component';
import { FollowUserUpdateComponent } from './follow-user-update.component';
import { FollowUserDeletePopupComponent, FollowUserDeleteDialogComponent } from './follow-user-delete-dialog.component';
import { followUserRoute, followUserPopupRoute } from './follow-user.route';

const ENTITY_STATES = [...followUserRoute, ...followUserPopupRoute];

@NgModule({
  imports: [SallefySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    FollowUserComponent,
    FollowUserDetailComponent,
    FollowUserUpdateComponent,
    FollowUserDeleteDialogComponent,
    FollowUserDeletePopupComponent
  ],
  entryComponents: [FollowUserComponent, FollowUserUpdateComponent, FollowUserDeleteDialogComponent, FollowUserDeletePopupComponent]
})
export class SallefyFollowUserModule {}
