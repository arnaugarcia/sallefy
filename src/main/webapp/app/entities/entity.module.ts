import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'track',
        loadChildren: () => import('./track/track.module').then(m => m.SallefyTrackModule)
      },
      {
        path: 'playlist',
        loadChildren: () => import('./playlist/playlist.module').then(m => m.SallefyPlaylistModule)
      },
      {
        path: 'album',
        loadChildren: () => import('./album/album.module').then(m => m.SallefyAlbumModule)
      },
      {
        path: 'like-track',
        loadChildren: () => import('./like-track/like-track.module').then(m => m.SallefyLikeTrackModule)
      },
      {
        path: 'follow-user',
        loadChildren: () => import('./follow-user/follow-user.module').then(m => m.SallefyFollowUserModule)
      },
      {
        path: 'like-album',
        loadChildren: () => import('./like-album/like-album.module').then(m => m.SallefyLikeAlbumModule)
      },
      {
        path: 'genre',
        loadChildren: () => import('./genre/genre.module').then(m => m.SallefyGenreModule)
      },
      {
        path: 'playback',
        loadChildren: () => import('./playback/playback.module').then(m => m.SallefyPlaybackModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: []
})
export class SallefyEntityModule {}
