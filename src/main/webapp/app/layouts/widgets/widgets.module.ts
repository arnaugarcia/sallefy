import { NgModule } from '@angular/core';
import { SallefySharedModule } from 'app/shared/shared.module';
import { TopTracksComponent } from 'app/layouts/widgets/top-tracks/top-tracks.component';
import { ArtistsComponent } from 'app/layouts/widgets/artists/artists.component';
import { GenresComponent } from 'app/layouts/widgets/genres/genres.component';
import { WidgetsComponent } from './widgets.component';
import { LanguageComponent } from './language/language.component';

@NgModule({
  declarations: [WidgetsComponent, GenresComponent, ArtistsComponent, TopTracksComponent, LanguageComponent],
  entryComponents: [GenresComponent, ArtistsComponent, TopTracksComponent],
  imports: [SallefySharedModule],
  exports: [WidgetsComponent]
})
export class SallefyWidgetsModule {}
