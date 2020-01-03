import { browser, ExpectedConditions as ec /* , protractor, promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  LikeTrackComponentsPage,
  /* LikeTrackDeleteDialog,
   */ LikeTrackUpdatePage
} from './like-track.page-object';

const expect = chai.expect;

describe('LikeTrack e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let likeTrackComponentsPage: LikeTrackComponentsPage;
  let likeTrackUpdatePage: LikeTrackUpdatePage;
  /* let likeTrackDeleteDialog: LikeTrackDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load LikeTracks', async () => {
    await navBarPage.goToEntity('like-track');
    likeTrackComponentsPage = new LikeTrackComponentsPage();
    await browser.wait(ec.visibilityOf(likeTrackComponentsPage.title), 5000);
    expect(await likeTrackComponentsPage.getTitle()).to.eq('sallefyApp.likeTrack.home.title');
  });

  it('should load create LikeTrack page', async () => {
    await likeTrackComponentsPage.clickOnCreateButton();
    likeTrackUpdatePage = new LikeTrackUpdatePage();
    expect(await likeTrackUpdatePage.getPageTitle()).to.eq('sallefyApp.likeTrack.home.createOrEditLabel');
    await likeTrackUpdatePage.cancel();
  });

  /*  it('should create and save LikeTracks', async () => {
        const nbButtonsBeforeCreate = await likeTrackComponentsPage.countDeleteButtons();

        await likeTrackComponentsPage.clickOnCreateButton();
        await promise.all([
            likeTrackUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            likeTrackUpdatePage.userSelectLastOption(),
            likeTrackUpdatePage.trackSelectLastOption(),
        ]);
        const selectedLiked = likeTrackUpdatePage.getLikedInput();
        if (await selectedLiked.isSelected()) {
            await likeTrackUpdatePage.getLikedInput().click();
            expect(await likeTrackUpdatePage.getLikedInput().isSelected(), 'Expected liked not to be selected').to.be.false;
        } else {
            await likeTrackUpdatePage.getLikedInput().click();
            expect(await likeTrackUpdatePage.getLikedInput().isSelected(), 'Expected liked to be selected').to.be.true;
        }
        expect(await likeTrackUpdatePage.getDateInput()).to.contain('2001-01-01T02:30', 'Expected date value to be equals to 2000-12-31');
        await likeTrackUpdatePage.save();
        expect(await likeTrackUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await likeTrackComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last LikeTrack', async () => {
        const nbButtonsBeforeDelete = await likeTrackComponentsPage.countDeleteButtons();
        await likeTrackComponentsPage.clickOnLastDeleteButton();

        likeTrackDeleteDialog = new LikeTrackDeleteDialog();
        expect(await likeTrackDeleteDialog.getDialogTitle())
            .to.eq('sallefyApp.likeTrack.delete.question');
        await likeTrackDeleteDialog.clickOnConfirmButton();

        expect(await likeTrackComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
