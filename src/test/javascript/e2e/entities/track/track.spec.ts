// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TrackComponentsPage, TrackDeleteDialog, TrackUpdatePage } from './track.page-object';

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
    await navBarPage.goToEntity('track');
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
      trackUpdatePage.setRatingInput('rating'),
      trackUpdatePage.setUrlInput('url'),
      trackUpdatePage.setPopularityInput('popularity'),
      trackUpdatePage.setThumbnailInput('thumbnail'),
      trackUpdatePage.setCreatedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      trackUpdatePage.setDurationInput('5'),
      trackUpdatePage.setPrimaryColorInput('primaryColor'),
      trackUpdatePage.userSelectLastOption()
      // trackUpdatePage.genreSelectLastOption(),
    ]);
    expect(await trackUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await trackUpdatePage.getRatingInput()).to.eq('rating', 'Expected Rating value to be equals to rating');
    expect(await trackUpdatePage.getUrlInput()).to.eq('url', 'Expected Url value to be equals to url');
    expect(await trackUpdatePage.getPopularityInput()).to.eq('popularity', 'Expected Popularity value to be equals to popularity');
    expect(await trackUpdatePage.getThumbnailInput()).to.eq('thumbnail', 'Expected Thumbnail value to be equals to thumbnail');
    expect(await trackUpdatePage.getCreatedAtInput()).to.contain('2001-01-01T02:30', 'Expected createdAt value to be equals to 2000-12-31');
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
