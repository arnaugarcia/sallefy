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
        path: 'artist-sf',
        loadChildren: () => import('./artist-sf/artist-sf.module').then(m => m.SallefyArtistSfModule)
      },
      {
        path: 'album-sf',
        loadChildren: () => import('./album-sf/album-sf.module').then(m => m.SallefyAlbumSfModule)
      },
      {
        path: 'image-sf',
        loadChildren: () => import('./image-sf/image-sf.module').then(m => m.SallefyImageSfModule)
      },
      {
        path: 'genre',
        loadChildren: () => import('./genre/genre.module').then(m => m.SallefyGenreModule)
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
