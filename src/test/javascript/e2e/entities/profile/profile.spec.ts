/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProfileComponentsPage, ProfileDeleteDialog, ProfileUpdatePage } from './profile.page-object';

const expect = chai.expect;

describe('Profile e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let profileUpdatePage: ProfileUpdatePage;
  let profileComponentsPage: ProfileComponentsPage;
  let profileDeleteDialog: ProfileDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Profiles', async () => {
    await navBarPage.goToEntity('profile');
    profileComponentsPage = new ProfileComponentsPage();
    await browser.wait(ec.visibilityOf(profileComponentsPage.title), 5000);
    expect(await profileComponentsPage.getTitle()).to.eq('sallefyApp.profile.home.title');
  });

  it('should load create Profile page', async () => {
    await profileComponentsPage.clickOnCreateButton();
    profileUpdatePage = new ProfileUpdatePage();
    expect(await profileUpdatePage.getPageTitle()).to.eq('sallefyApp.profile.home.createOrEditLabel');
    await profileUpdatePage.cancel();
  });

  it('should create and save Profiles', async () => {
    const nbButtonsBeforeCreate = await profileComponentsPage.countDeleteButtons();

    await profileComponentsPage.clickOnCreateButton();
    await promise.all([
      profileUpdatePage.setNameInput('name'),
      profileUpdatePage.setPhotoInput('photo'),
      profileUpdatePage.setBiographyInput('biography'),
      profileUpdatePage.userSelectLastOption()
    ]);
    const selectedArtist = profileUpdatePage.getArtistInput();
    if (await selectedArtist.isSelected()) {
      await profileUpdatePage.getArtistInput().click();
      expect(await profileUpdatePage.getArtistInput().isSelected(), 'Expected artist not to be selected').to.be.false;
    } else {
      await profileUpdatePage.getArtistInput().click();
      expect(await profileUpdatePage.getArtistInput().isSelected(), 'Expected artist to be selected').to.be.true;
    }
    expect(await profileUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await profileUpdatePage.getPhotoInput()).to.eq('photo', 'Expected Photo value to be equals to photo');
    expect(await profileUpdatePage.getBiographyInput()).to.eq('biography', 'Expected Biography value to be equals to biography');
    await profileUpdatePage.save();
    expect(await profileUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await profileComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Profile', async () => {
    const nbButtonsBeforeDelete = await profileComponentsPage.countDeleteButtons();
    await profileComponentsPage.clickOnLastDeleteButton();

    profileDeleteDialog = new ProfileDeleteDialog();
    expect(await profileDeleteDialog.getDialogTitle()).to.eq('sallefyApp.profile.delete.question');
    await profileDeleteDialog.clickOnConfirmButton();

    expect(await profileComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
