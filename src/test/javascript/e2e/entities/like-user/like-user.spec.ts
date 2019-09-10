/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { LikeUserComponentsPage, LikeUserDeleteDialog, LikeUserUpdatePage } from './like-user.page-object';

const expect = chai.expect;

describe('LikeUser e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let likeUserUpdatePage: LikeUserUpdatePage;
  let likeUserComponentsPage: LikeUserComponentsPage;
  let likeUserDeleteDialog: LikeUserDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load LikeUsers', async () => {
    await navBarPage.goToEntity('like-user');
    likeUserComponentsPage = new LikeUserComponentsPage();
    await browser.wait(ec.visibilityOf(likeUserComponentsPage.title), 5000);
    expect(await likeUserComponentsPage.getTitle()).to.eq('sallefyApp.likeUser.home.title');
  });

  it('should load create LikeUser page', async () => {
    await likeUserComponentsPage.clickOnCreateButton();
    likeUserUpdatePage = new LikeUserUpdatePage();
    expect(await likeUserUpdatePage.getPageTitle()).to.eq('sallefyApp.likeUser.home.createOrEditLabel');
    await likeUserUpdatePage.cancel();
  });

  it('should create and save LikeUsers', async () => {
    const nbButtonsBeforeCreate = await likeUserComponentsPage.countDeleteButtons();

    await likeUserComponentsPage.clickOnCreateButton();
    await promise.all([
      likeUserUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      likeUserUpdatePage.likedUserSelectLastOption(),
      likeUserUpdatePage.userSelectLastOption()
    ]);
    const selectedLiked = likeUserUpdatePage.getLikedInput();
    if (await selectedLiked.isSelected()) {
      await likeUserUpdatePage.getLikedInput().click();
      expect(await likeUserUpdatePage.getLikedInput().isSelected(), 'Expected liked not to be selected').to.be.false;
    } else {
      await likeUserUpdatePage.getLikedInput().click();
      expect(await likeUserUpdatePage.getLikedInput().isSelected(), 'Expected liked to be selected').to.be.true;
    }
    expect(await likeUserUpdatePage.getDateInput()).to.contain('2001-01-01T02:30', 'Expected date value to be equals to 2000-12-31');
    await likeUserUpdatePage.save();
    expect(await likeUserUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await likeUserComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last LikeUser', async () => {
    const nbButtonsBeforeDelete = await likeUserComponentsPage.countDeleteButtons();
    await likeUserComponentsPage.clickOnLastDeleteButton();

    likeUserDeleteDialog = new LikeUserDeleteDialog();
    expect(await likeUserDeleteDialog.getDialogTitle()).to.eq('sallefyApp.likeUser.delete.question');
    await likeUserDeleteDialog.clickOnConfirmButton();

    expect(await likeUserComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
