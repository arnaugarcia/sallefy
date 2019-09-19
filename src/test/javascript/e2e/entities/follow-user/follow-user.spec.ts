// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FollowUserComponentsPage, FollowUserDeleteDialog, FollowUserUpdatePage } from './follow-user.page-object';

const expect = chai.expect;

describe('FollowUser e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let followUserUpdatePage: FollowUserUpdatePage;
  let followUserComponentsPage: FollowUserComponentsPage;
  let followUserDeleteDialog: FollowUserDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load FollowUsers', async () => {
    await navBarPage.goToEntity('follow-user');
    followUserComponentsPage = new FollowUserComponentsPage();
    await browser.wait(ec.visibilityOf(followUserComponentsPage.title), 5000);
    expect(await followUserComponentsPage.getTitle()).to.eq('sallefyApp.followUser.home.title');
  });

  it('should load create FollowUser page', async () => {
    await followUserComponentsPage.clickOnCreateButton();
    followUserUpdatePage = new FollowUserUpdatePage();
    expect(await followUserUpdatePage.getPageTitle()).to.eq('sallefyApp.followUser.home.createOrEditLabel');
    await followUserUpdatePage.cancel();
  });

  it('should create and save FollowUsers', async () => {
    const nbButtonsBeforeCreate = await followUserComponentsPage.countDeleteButtons();

    await followUserComponentsPage.clickOnCreateButton();
    await promise.all([
      followUserUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      followUserUpdatePage.followedSelectLastOption(),
      followUserUpdatePage.userSelectLastOption()
    ]);
    expect(await followUserUpdatePage.getDateInput()).to.contain('2001-01-01T02:30', 'Expected date value to be equals to 2000-12-31');
    await followUserUpdatePage.save();
    expect(await followUserUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await followUserComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last FollowUser', async () => {
    const nbButtonsBeforeDelete = await followUserComponentsPage.countDeleteButtons();
    await followUserComponentsPage.clickOnLastDeleteButton();

    followUserDeleteDialog = new FollowUserDeleteDialog();
    expect(await followUserDeleteDialog.getDialogTitle()).to.eq('sallefyApp.followUser.delete.question');
    await followUserDeleteDialog.clickOnConfirmButton();

    expect(await followUserComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
