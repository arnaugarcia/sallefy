import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SallefySharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { TracksComponent } from './sections/tracks/tracks.component';
import { ReleasesComponent } from './sections/releases/releases.component';
import { GenresComponent } from './widgets/genres/genres.component';
import { ArtistsComponent } from './widgets/artists/artists.component';
import { TopTracksComponent } from './widgets/top-tracks/top-tracks.component';
import { PlaylistsComponent } from './sections/playlists/playlists.component';

@NgModule({
  imports: [SallefySharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [
    TracksComponent,
    ReleasesComponent,
    HomeComponent,
    GenresComponent,
    ArtistsComponent,
    TopTracksComponent,
    PlaylistsComponent
  ]
})
export class SallefyHomeModule {}
