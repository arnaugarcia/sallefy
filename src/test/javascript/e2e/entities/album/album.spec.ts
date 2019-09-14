// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AlbumComponentsPage, AlbumDeleteDialog, AlbumUpdatePage } from './album.page-object';

const expect = chai.expect;

describe('Album e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let albumUpdatePage: AlbumUpdatePage;
  let albumComponentsPage: AlbumComponentsPage;
  let albumDeleteDialog: AlbumDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Albums', async () => {
    await navBarPage.goToEntity('album');
    albumComponentsPage = new AlbumComponentsPage();
    await browser.wait(ec.visibilityOf(albumComponentsPage.title), 5000);
    expect(await albumComponentsPage.getTitle()).to.eq('sallefyApp.album.home.title');
  });

  it('should load create Album page', async () => {
    await albumComponentsPage.clickOnCreateButton();
    albumUpdatePage = new AlbumUpdatePage();
    expect(await albumUpdatePage.getPageTitle()).to.eq('sallefyApp.album.home.createOrEditLabel');
    await albumUpdatePage.cancel();
  });

  it('should create and save Albums', async () => {
    const nbButtonsBeforeCreate = await albumComponentsPage.countDeleteButtons();

    await albumComponentsPage.clickOnCreateButton();
    await promise.all([
      albumUpdatePage.setTitleInput('title'),
      albumUpdatePage.setYearInput('5'),
      albumUpdatePage.setThumbnailInput('thumbnail'),
      albumUpdatePage.setTotalTracksInput('5'),
      albumUpdatePage.userSelectLastOption()
      // albumUpdatePage.trackSelectLastOption(),
    ]);
    expect(await albumUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
    expect(await albumUpdatePage.getYearInput()).to.eq('5', 'Expected year value to be equals to 5');
    expect(await albumUpdatePage.getThumbnailInput()).to.eq('thumbnail', 'Expected Thumbnail value to be equals to thumbnail');
    expect(await albumUpdatePage.getTotalTracksInput()).to.eq('5', 'Expected totalTracks value to be equals to 5');
    await albumUpdatePage.save();
    expect(await albumUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await albumComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Album', async () => {
    const nbButtonsBeforeDelete = await albumComponentsPage.countDeleteButtons();
    await albumComponentsPage.clickOnLastDeleteButton();

    albumDeleteDialog = new AlbumDeleteDialog();
    expect(await albumDeleteDialog.getDialogTitle()).to.eq('sallefyApp.album.delete.question');
    await albumDeleteDialog.clickOnConfirmButton();

    expect(await albumComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
