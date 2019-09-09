/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PlaylistComponentsPage, PlaylistDeleteDialog, PlaylistUpdatePage } from './playlist-sf.page-object';

const expect = chai.expect;

describe('Playlist e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let playlistUpdatePage: PlaylistUpdatePage;
  let playlistComponentsPage: PlaylistComponentsPage;
  let playlistDeleteDialog: PlaylistDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Playlists', async () => {
    await navBarPage.goToEntity('playlist-sf');
    playlistComponentsPage = new PlaylistComponentsPage();
    await browser.wait(ec.visibilityOf(playlistComponentsPage.title), 5000);
    expect(await playlistComponentsPage.getTitle()).to.eq('sallefyApp.playlist.home.title');
  });

  it('should load create Playlist page', async () => {
    await playlistComponentsPage.clickOnCreateButton();
    playlistUpdatePage = new PlaylistUpdatePage();
    expect(await playlistUpdatePage.getPageTitle()).to.eq('sallefyApp.playlist.home.createOrEditLabel');
    await playlistUpdatePage.cancel();
  });

  it('should create and save Playlists', async () => {
    const nbButtonsBeforeCreate = await playlistComponentsPage.countDeleteButtons();

    await playlistComponentsPage.clickOnCreateButton();
    await promise.all([
      playlistUpdatePage.setNameInput('name'),
      playlistUpdatePage.setReferenceInput('reference'),
      playlistUpdatePage.setDescriptionInput('description'),
      playlistUpdatePage.setPrimaryColorInput('primaryColor'),
      playlistUpdatePage.setNumberSongsInput('5'),
      playlistUpdatePage.setFollowersInput('5'),
      playlistUpdatePage.setRatingInput('5'),
      playlistUpdatePage.ownerSelectLastOption()
      // playlistUpdatePage.trackSelectLastOption(),
    ]);
    expect(await playlistUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    const selectedCollaborative = playlistUpdatePage.getCollaborativeInput();
    if (await selectedCollaborative.isSelected()) {
      await playlistUpdatePage.getCollaborativeInput().click();
      expect(await playlistUpdatePage.getCollaborativeInput().isSelected(), 'Expected collaborative not to be selected').to.be.false;
    } else {
      await playlistUpdatePage.getCollaborativeInput().click();
      expect(await playlistUpdatePage.getCollaborativeInput().isSelected(), 'Expected collaborative to be selected').to.be.true;
    }
    expect(await playlistUpdatePage.getReferenceInput()).to.eq('reference', 'Expected Reference value to be equals to reference');
    expect(await playlistUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await playlistUpdatePage.getPrimaryColorInput()).to.eq(
      'primaryColor',
      'Expected PrimaryColor value to be equals to primaryColor'
    );
    const selectedPublicAccessible = playlistUpdatePage.getPublicAccessibleInput();
    if (await selectedPublicAccessible.isSelected()) {
      await playlistUpdatePage.getPublicAccessibleInput().click();
      expect(await playlistUpdatePage.getPublicAccessibleInput().isSelected(), 'Expected publicAccessible not to be selected').to.be.false;
    } else {
      await playlistUpdatePage.getPublicAccessibleInput().click();
      expect(await playlistUpdatePage.getPublicAccessibleInput().isSelected(), 'Expected publicAccessible to be selected').to.be.true;
    }
    expect(await playlistUpdatePage.getNumberSongsInput()).to.eq('5', 'Expected numberSongs value to be equals to 5');
    expect(await playlistUpdatePage.getFollowersInput()).to.eq('5', 'Expected followers value to be equals to 5');
    expect(await playlistUpdatePage.getRatingInput()).to.eq('5', 'Expected rating value to be equals to 5');
    await playlistUpdatePage.save();
    expect(await playlistUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await playlistComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Playlist', async () => {
    const nbButtonsBeforeDelete = await playlistComponentsPage.countDeleteButtons();
    await playlistComponentsPage.clickOnLastDeleteButton();

    playlistDeleteDialog = new PlaylistDeleteDialog();
    expect(await playlistDeleteDialog.getDialogTitle()).to.eq('sallefyApp.playlist.delete.question');
    await playlistDeleteDialog.clickOnConfirmButton();

    expect(await playlistComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
