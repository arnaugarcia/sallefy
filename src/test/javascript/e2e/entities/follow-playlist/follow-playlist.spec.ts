import { browser, ExpectedConditions as ec /* , protractor, promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  FollowPlaylistComponentsPage,
  /* FollowPlaylistDeleteDialog,
   */ FollowPlaylistUpdatePage
} from './follow-playlist.page-object';

const expect = chai.expect;

describe('FollowPlaylist e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let followPlaylistComponentsPage: FollowPlaylistComponentsPage;
  let followPlaylistUpdatePage: FollowPlaylistUpdatePage;
  /* let followPlaylistDeleteDialog: FollowPlaylistDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load FollowPlaylists', async () => {
    await navBarPage.goToEntity('follow-playlist');
    followPlaylistComponentsPage = new FollowPlaylistComponentsPage();
    await browser.wait(ec.visibilityOf(followPlaylistComponentsPage.title), 5000);
    expect(await followPlaylistComponentsPage.getTitle()).to.eq('sallefyApp.followPlaylist.home.title');
  });

  it('should load create FollowPlaylist page', async () => {
    await followPlaylistComponentsPage.clickOnCreateButton();
    followPlaylistUpdatePage = new FollowPlaylistUpdatePage();
    expect(await followPlaylistUpdatePage.getPageTitle()).to.eq('sallefyApp.followPlaylist.home.createOrEditLabel');
    await followPlaylistUpdatePage.cancel();
  });

  /*  it('should create and save FollowPlaylists', async () => {
        const nbButtonsBeforeCreate = await followPlaylistComponentsPage.countDeleteButtons();

        await followPlaylistComponentsPage.clickOnCreateButton();
        await promise.all([
            followPlaylistUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            followPlaylistUpdatePage.userSelectLastOption(),
            followPlaylistUpdatePage.playlistSelectLastOption(),
        ]);
        expect(await followPlaylistUpdatePage.getDateInput()).to.contain('2001-01-01T02:30', 'Expected date value to be equals to 2000-12-31');
        await followPlaylistUpdatePage.save();
        expect(await followPlaylistUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await followPlaylistComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last FollowPlaylist', async () => {
        const nbButtonsBeforeDelete = await followPlaylistComponentsPage.countDeleteButtons();
        await followPlaylistComponentsPage.clickOnLastDeleteButton();

        followPlaylistDeleteDialog = new FollowPlaylistDeleteDialog();
        expect(await followPlaylistDeleteDialog.getDialogTitle())
            .to.eq('sallefyApp.followPlaylist.delete.question');
        await followPlaylistDeleteDialog.clickOnConfirmButton();

        expect(await followPlaylistComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
