import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SallefySharedModule } from 'app/shared/shared.module';
import { LikeAlbumComponent } from './like-album.component';
import { LikeAlbumDetailComponent } from './like-album-detail.component';
import { LikeAlbumUpdateComponent } from './like-album-update.component';
import { LikeAlbumDeletePopupComponent, LikeAlbumDeleteDialogComponent } from './like-album-delete-dialog.component';
import { likeAlbumRoute, likeAlbumPopupRoute } from './like-album.route';

const ENTITY_STATES = [...likeAlbumRoute, ...likeAlbumPopupRoute];

@NgModule({
  imports: [SallefySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    LikeAlbumComponent,
    LikeAlbumDetailComponent,
    LikeAlbumUpdateComponent,
    LikeAlbumDeleteDialogComponent,
    LikeAlbumDeletePopupComponent
  ],
  entryComponents: [LikeAlbumComponent, LikeAlbumUpdateComponent, LikeAlbumDeleteDialogComponent, LikeAlbumDeletePopupComponent]
})
export class SallefyLikeAlbumModule {}
