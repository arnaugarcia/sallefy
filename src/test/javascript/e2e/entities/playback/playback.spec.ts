// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PlaybackComponentsPage, PlaybackDeleteDialog, PlaybackUpdatePage } from './playback.page-object';

const expect = chai.expect;

describe('Playback e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let playbackUpdatePage: PlaybackUpdatePage;
  let playbackComponentsPage: PlaybackComponentsPage;
  /* let playbackDeleteDialog: PlaybackDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Playbacks', async () => {
    await navBarPage.goToEntity('playback');
    playbackComponentsPage = new PlaybackComponentsPage();
    await browser.wait(ec.visibilityOf(playbackComponentsPage.title), 5000);
    expect(await playbackComponentsPage.getTitle()).to.eq('sallefyApp.playback.home.title');
  });

  it('should load create Playback page', async () => {
    await playbackComponentsPage.clickOnCreateButton();
    playbackUpdatePage = new PlaybackUpdatePage();
    expect(await playbackUpdatePage.getPageTitle()).to.eq('sallefyApp.playback.home.createOrEditLabel');
    await playbackUpdatePage.cancel();
  });

  /*  it('should create and save Playbacks', async () => {
        const nbButtonsBeforeCreate = await playbackComponentsPage.countDeleteButtons();

        await playbackComponentsPage.clickOnCreateButton();
        await promise.all([
            playbackUpdatePage.setIpInput('ip'),
            playbackUpdatePage.setLatitudeInput('5'),
            playbackUpdatePage.setLongitudeInput('5'),
            playbackUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            playbackUpdatePage.userSelectLastOption(),
            playbackUpdatePage.trackSelectLastOption(),
        ]);
        expect(await playbackUpdatePage.getIpInput()).to.eq('ip', 'Expected Ip value to be equals to ip');
        expect(await playbackUpdatePage.getLatitudeInput()).to.eq('5', 'Expected latitude value to be equals to 5');
        expect(await playbackUpdatePage.getLongitudeInput()).to.eq('5', 'Expected longitude value to be equals to 5');
        expect(await playbackUpdatePage.getDateInput()).to.contain('2001-01-01T02:30', 'Expected date value to be equals to 2000-12-31');
        await playbackUpdatePage.save();
        expect(await playbackUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await playbackComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last Playback', async () => {
        const nbButtonsBeforeDelete = await playbackComponentsPage.countDeleteButtons();
        await playbackComponentsPage.clickOnLastDeleteButton();

        playbackDeleteDialog = new PlaybackDeleteDialog();
        expect(await playbackDeleteDialog.getDialogTitle())
            .to.eq('sallefyApp.playback.delete.question');
        await playbackDeleteDialog.clickOnConfirmButton();

        expect(await playbackComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
