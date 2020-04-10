import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import './vendor';
import { SallefySharedModule } from 'app/shared/shared.module';
import { SallefyCoreModule } from 'app/core/core.module';
import { SallefyAppRoutingModule } from './app-routing.module';
import { SallefyHomeModule } from './home/home.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { SfMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { SallefyPlayerModule } from 'app/layouts/player/player.module';
import { NotificationComponent } from './layouts/navbar/notification/notification.component';
import { ProfileComponent } from './layouts/navbar/profile/profile.component';
import { SallefyWidgetsModule } from 'app/layouts/widgets/widgets.module';
import { SallefyPlaylistModule } from 'app/playlist/playlist.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SallefySharedModule,
    SallefyCoreModule,
    SallefyHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    // SallefyEntityModule,
    SallefyPlaylistModule,
    SallefyPlayerModule,
    SallefyWidgetsModule,
    SallefyAppRoutingModule
  ],
  declarations: [
    SfMainComponent,
    NotificationComponent,
    ProfileComponent,
    NavbarComponent,
    ErrorComponent,
    PageRibbonComponent,
    ActiveMenuDirective,
    FooterComponent
  ],
  bootstrap: [SfMainComponent]
})
export class SallefyAppModule {}
