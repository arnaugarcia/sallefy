/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ArtistComponentsPage, ArtistDeleteDialog, ArtistUpdatePage } from './artist-sf.page-object';

const expect = chai.expect;

describe('Artist e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let artistUpdatePage: ArtistUpdatePage;
  let artistComponentsPage: ArtistComponentsPage;
  let artistDeleteDialog: ArtistDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Artists', async () => {
    await navBarPage.goToEntity('artist-sf');
    artistComponentsPage = new ArtistComponentsPage();
    await browser.wait(ec.visibilityOf(artistComponentsPage.title), 5000);
    expect(await artistComponentsPage.getTitle()).to.eq('sallefyApp.artist.home.title');
  });

  it('should load create Artist page', async () => {
    await artistComponentsPage.clickOnCreateButton();
    artistUpdatePage = new ArtistUpdatePage();
    expect(await artistUpdatePage.getPageTitle()).to.eq('sallefyApp.artist.home.createOrEditLabel');
    await artistUpdatePage.cancel();
  });

  it('should create and save Artists', async () => {
    const nbButtonsBeforeCreate = await artistComponentsPage.countDeleteButtons();

    await artistComponentsPage.clickOnCreateButton();
    await promise.all([
      artistUpdatePage.setNameInput('name'),
      artistUpdatePage.setReferenceInput('reference'),
      artistUpdatePage.setPhotoInput('photo'),
      artistUpdatePage.setBiographyInput('biography')
    ]);
    expect(await artistUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await artistUpdatePage.getReferenceInput()).to.eq('reference', 'Expected Reference value to be equals to reference');
    expect(await artistUpdatePage.getPhotoInput()).to.eq('photo', 'Expected Photo value to be equals to photo');
    expect(await artistUpdatePage.getBiographyInput()).to.eq('biography', 'Expected Biography value to be equals to biography');
    await artistUpdatePage.save();
    expect(await artistUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await artistComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Artist', async () => {
    const nbButtonsBeforeDelete = await artistComponentsPage.countDeleteButtons();
    await artistComponentsPage.clickOnLastDeleteButton();

    artistDeleteDialog = new ArtistDeleteDialog();
    expect(await artistDeleteDialog.getDialogTitle()).to.eq('sallefyApp.artist.delete.question');
    await artistDeleteDialog.clickOnConfirmButton();

    expect(await artistComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
