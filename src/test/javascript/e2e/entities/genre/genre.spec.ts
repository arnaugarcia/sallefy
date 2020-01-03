import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { GenreComponentsPage, GenreDeleteDialog, GenreUpdatePage } from './genre.page-object';

const expect = chai.expect;

describe('Genre e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let genreComponentsPage: GenreComponentsPage;
  let genreUpdatePage: GenreUpdatePage;
  let genreDeleteDialog: GenreDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Genres', async () => {
    await navBarPage.goToEntity('genre');
    genreComponentsPage = new GenreComponentsPage();
    await browser.wait(ec.visibilityOf(genreComponentsPage.title), 5000);
    expect(await genreComponentsPage.getTitle()).to.eq('sallefyApp.genre.home.title');
  });

  it('should load create Genre page', async () => {
    await genreComponentsPage.clickOnCreateButton();
    genreUpdatePage = new GenreUpdatePage();
    expect(await genreUpdatePage.getPageTitle()).to.eq('sallefyApp.genre.home.createOrEditLabel');
    await genreUpdatePage.cancel();
  });

  it('should create and save Genres', async () => {
    const nbButtonsBeforeCreate = await genreComponentsPage.countDeleteButtons();

    await genreComponentsPage.clickOnCreateButton();
    await promise.all([genreUpdatePage.setNameInput('name'), genreUpdatePage.setPopularityInput('5')]);
    expect(await genreUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await genreUpdatePage.getPopularityInput()).to.eq('5', 'Expected popularity value to be equals to 5');
    await genreUpdatePage.save();
    expect(await genreUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await genreComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Genre', async () => {
    const nbButtonsBeforeDelete = await genreComponentsPage.countDeleteButtons();
    await genreComponentsPage.clickOnLastDeleteButton();

    genreDeleteDialog = new GenreDeleteDialog();
    expect(await genreDeleteDialog.getDialogTitle()).to.eq('sallefyApp.genre.delete.question');
    await genreDeleteDialog.clickOnConfirmButton();

    expect(await genreComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
