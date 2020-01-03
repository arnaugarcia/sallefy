import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SallefySharedModule } from 'app/shared/shared.module';
import { FollowUserComponent } from './follow-user.component';
import { FollowUserDetailComponent } from './follow-user-detail.component';
import { FollowUserUpdateComponent } from './follow-user-update.component';
import { FollowUserDeleteDialogComponent } from './follow-user-delete-dialog.component';
import { followUserRoute } from './follow-user.route';

@NgModule({
  imports: [SallefySharedModule, RouterModule.forChild(followUserRoute)],
  declarations: [FollowUserComponent, FollowUserDetailComponent, FollowUserUpdateComponent, FollowUserDeleteDialogComponent],
  entryComponents: [FollowUserDeleteDialogComponent]
})
export class SallefyFollowUserModule {}
