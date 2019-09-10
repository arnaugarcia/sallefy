import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'track-sf',
        loadChildren: () => import('./track-sf/track-sf.module').then(m => m.SallefyTrackSfModule)
      },
      {
        path: 'playlist-sf',
        loadChildren: () => import('./playlist-sf/playlist-sf.module').then(m => m.SallefyPlaylistSfModule)
      },
      {
        path: 'album-sf',
        loadChildren: () => import('./album-sf/album-sf.module').then(m => m.SallefyAlbumSfModule)
      },
      {
        path: 'like-track',
        loadChildren: () => import('./like-track/like-track.module').then(m => m.SallefyLikeTrackModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SallefyEntityModule {}
