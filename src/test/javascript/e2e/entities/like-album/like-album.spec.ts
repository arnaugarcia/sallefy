import { browser, ExpectedConditions as ec /* , protractor, promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  LikeAlbumComponentsPage,
  /* LikeAlbumDeleteDialog,
   */ LikeAlbumUpdatePage
} from './like-album.page-object';

const expect = chai.expect;

describe('LikeAlbum e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let likeAlbumComponentsPage: LikeAlbumComponentsPage;
  let likeAlbumUpdatePage: LikeAlbumUpdatePage;
  /* let likeAlbumDeleteDialog: LikeAlbumDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load LikeAlbums', async () => {
    await navBarPage.goToEntity('like-album');
    likeAlbumComponentsPage = new LikeAlbumComponentsPage();
    await browser.wait(ec.visibilityOf(likeAlbumComponentsPage.title), 5000);
    expect(await likeAlbumComponentsPage.getTitle()).to.eq('sallefyApp.likeAlbum.home.title');
  });

  it('should load create LikeAlbum page', async () => {
    await likeAlbumComponentsPage.clickOnCreateButton();
    likeAlbumUpdatePage = new LikeAlbumUpdatePage();
    expect(await likeAlbumUpdatePage.getPageTitle()).to.eq('sallefyApp.likeAlbum.home.createOrEditLabel');
    await likeAlbumUpdatePage.cancel();
  });

  /*  it('should create and save LikeAlbums', async () => {
        const nbButtonsBeforeCreate = await likeAlbumComponentsPage.countDeleteButtons();

        await likeAlbumComponentsPage.clickOnCreateButton();
        await promise.all([
            likeAlbumUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            likeAlbumUpdatePage.userSelectLastOption(),
            likeAlbumUpdatePage.albumSelectLastOption(),
        ]);
        const selectedLiked = likeAlbumUpdatePage.getLikedInput();
        if (await selectedLiked.isSelected()) {
            await likeAlbumUpdatePage.getLikedInput().click();
            expect(await likeAlbumUpdatePage.getLikedInput().isSelected(), 'Expected liked not to be selected').to.be.false;
        } else {
            await likeAlbumUpdatePage.getLikedInput().click();
            expect(await likeAlbumUpdatePage.getLikedInput().isSelected(), 'Expected liked to be selected').to.be.true;
        }
        expect(await likeAlbumUpdatePage.getDateInput()).to.contain('2001-01-01T02:30', 'Expected date value to be equals to 2000-12-31');
        await likeAlbumUpdatePage.save();
        expect(await likeAlbumUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await likeAlbumComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last LikeAlbum', async () => {
        const nbButtonsBeforeDelete = await likeAlbumComponentsPage.countDeleteButtons();
        await likeAlbumComponentsPage.clickOnLastDeleteButton();

        likeAlbumDeleteDialog = new LikeAlbumDeleteDialog();
        expect(await likeAlbumDeleteDialog.getDialogTitle())
            .to.eq('sallefyApp.likeAlbum.delete.question');
        await likeAlbumDeleteDialog.clickOnConfirmButton();

        expect(await likeAlbumComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
