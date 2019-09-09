import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ArtistComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-artist-sf div table .btn-danger'));
  title = element.all(by.css('jhi-artist-sf div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class ArtistUpdatePage {
  pageTitle = element(by.id('jhi-artist-sf-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameInput = element(by.id('field_name'));
  referenceInput = element(by.id('field_reference'));
  photoInput = element(by.id('field_photo'));
  biographyInput = element(by.id('field_biography'));
  albumSelect = element(by.id('field_album'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return await this.nameInput.getAttribute('value');
  }

  async setReferenceInput(reference) {
    await this.referenceInput.sendKeys(reference);
  }

  async getReferenceInput() {
    return await this.referenceInput.getAttribute('value');
  }

  async setPhotoInput(photo) {
    await this.photoInput.sendKeys(photo);
  }

  async getPhotoInput() {
    return await this.photoInput.getAttribute('value');
  }

  async setBiographyInput(biography) {
    await this.biographyInput.sendKeys(biography);
  }

  async getBiographyInput() {
    return await this.biographyInput.getAttribute('value');
  }

  async albumSelectLastOption(timeout?: number) {
    await this.albumSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async albumSelectOption(option) {
    await this.albumSelect.sendKeys(option);
  }

  getAlbumSelect(): ElementFinder {
    return this.albumSelect;
  }

  async getAlbumSelectedOption() {
    return await this.albumSelect.element(by.css('option:checked')).getText();
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ArtistDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-artist-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-artist'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
