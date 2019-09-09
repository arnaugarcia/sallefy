/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ImageComponentsPage, ImageDeleteDialog, ImageUpdatePage } from './image-sf.page-object';

const expect = chai.expect;

describe('Image e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let imageUpdatePage: ImageUpdatePage;
  let imageComponentsPage: ImageComponentsPage;
  let imageDeleteDialog: ImageDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Images', async () => {
    await navBarPage.goToEntity('image-sf');
    imageComponentsPage = new ImageComponentsPage();
    await browser.wait(ec.visibilityOf(imageComponentsPage.title), 5000);
    expect(await imageComponentsPage.getTitle()).to.eq('sallefyApp.image.home.title');
  });

  it('should load create Image page', async () => {
    await imageComponentsPage.clickOnCreateButton();
    imageUpdatePage = new ImageUpdatePage();
    expect(await imageUpdatePage.getPageTitle()).to.eq('sallefyApp.image.home.createOrEditLabel');
    await imageUpdatePage.cancel();
  });

  it('should create and save Images', async () => {
    const nbButtonsBeforeCreate = await imageComponentsPage.countDeleteButtons();

    await imageComponentsPage.clickOnCreateButton();
    await promise.all([
      imageUpdatePage.setUrlInput('url'),
      imageUpdatePage.setHeightInput('5'),
      imageUpdatePage.setReferenceInput('reference'),
      imageUpdatePage.setWidthInput('5'),
      imageUpdatePage.albumSelectLastOption(),
      imageUpdatePage.artistSelectLastOption(),
      imageUpdatePage.playlistSelectLastOption(),
      imageUpdatePage.trackSelectLastOption()
    ]);
    expect(await imageUpdatePage.getUrlInput()).to.eq('url', 'Expected Url value to be equals to url');
    expect(await imageUpdatePage.getHeightInput()).to.eq('5', 'Expected height value to be equals to 5');
    expect(await imageUpdatePage.getReferenceInput()).to.eq('reference', 'Expected Reference value to be equals to reference');
    const selectedThumbnail = imageUpdatePage.getThumbnailInput();
    if (await selectedThumbnail.isSelected()) {
      await imageUpdatePage.getThumbnailInput().click();
      expect(await imageUpdatePage.getThumbnailInput().isSelected(), 'Expected thumbnail not to be selected').to.be.false;
    } else {
      await imageUpdatePage.getThumbnailInput().click();
      expect(await imageUpdatePage.getThumbnailInput().isSelected(), 'Expected thumbnail to be selected').to.be.true;
    }
    const selectedCover = imageUpdatePage.getCoverInput();
    if (await selectedCover.isSelected()) {
      await imageUpdatePage.getCoverInput().click();
      expect(await imageUpdatePage.getCoverInput().isSelected(), 'Expected cover not to be selected').to.be.false;
    } else {
      await imageUpdatePage.getCoverInput().click();
      expect(await imageUpdatePage.getCoverInput().isSelected(), 'Expected cover to be selected').to.be.true;
    }
    expect(await imageUpdatePage.getWidthInput()).to.eq('5', 'Expected width value to be equals to 5');
    await imageUpdatePage.save();
    expect(await imageUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await imageComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Image', async () => {
    const nbButtonsBeforeDelete = await imageComponentsPage.countDeleteButtons();
    await imageComponentsPage.clickOnLastDeleteButton();

    imageDeleteDialog = new ImageDeleteDialog();
    expect(await imageDeleteDialog.getDialogTitle()).to.eq('sallefyApp.image.delete.question');
    await imageDeleteDialog.clickOnConfirmButton();

    expect(await imageComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
