/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TrackComponentsPage, TrackDeleteDialog, TrackUpdatePage } from './track-sf.page-object';

const expect = chai.expect;

describe('Track e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let trackUpdatePage: TrackUpdatePage;
  let trackComponentsPage: TrackComponentsPage;
  let trackDeleteDialog: TrackDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Tracks', async () => {
    await navBarPage.goToEntity('track-sf');
    trackComponentsPage = new TrackComponentsPage();
    await browser.wait(ec.visibilityOf(trackComponentsPage.title), 5000);
    expect(await trackComponentsPage.getTitle()).to.eq('sallefyApp.track.home.title');
  });

  it('should load create Track page', async () => {
    await trackComponentsPage.clickOnCreateButton();
    trackUpdatePage = new TrackUpdatePage();
    expect(await trackUpdatePage.getPageTitle()).to.eq('sallefyApp.track.home.createOrEditLabel');
    await trackUpdatePage.cancel();
  });

  it('should create and save Tracks', async () => {
    const nbButtonsBeforeCreate = await trackComponentsPage.countDeleteButtons();

    await trackComponentsPage.clickOnCreateButton();
    await promise.all([
      trackUpdatePage.setNameInput('name'),
      trackUpdatePage.setRaitingInput('5'),
      trackUpdatePage.setUrlInput('url'),
      trackUpdatePage.setReferenceInput('reference'),
      trackUpdatePage.setDurationInput('5'),
      trackUpdatePage.setPrimaryColorInput('primaryColor')
      // trackUpdatePage.playlistSelectLastOption(),
    ]);
    expect(await trackUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await trackUpdatePage.getRaitingInput()).to.eq('5', 'Expected raiting value to be equals to 5');
    expect(await trackUpdatePage.getUrlInput()).to.eq('url', 'Expected Url value to be equals to url');
    expect(await trackUpdatePage.getReferenceInput()).to.eq('reference', 'Expected Reference value to be equals to reference');
    expect(await trackUpdatePage.getDurationInput()).to.eq('5', 'Expected duration value to be equals to 5');
    expect(await trackUpdatePage.getPrimaryColorInput()).to.eq('primaryColor', 'Expected PrimaryColor value to be equals to primaryColor');
    await trackUpdatePage.save();
    expect(await trackUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await trackComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Track', async () => {
    const nbButtonsBeforeDelete = await trackComponentsPage.countDeleteButtons();
    await trackComponentsPage.clickOnLastDeleteButton();

    trackDeleteDialog = new TrackDeleteDialog();
    expect(await trackDeleteDialog.getDialogTitle()).to.eq('sallefyApp.track.delete.question');
    await trackDeleteDialog.clickOnConfirmButton();

    expect(await trackComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
