import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class AlbumComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-album-sf div table .btn-danger'));
  title = element.all(by.css('jhi-album-sf div h2#page-heading span')).first();

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

export class AlbumUpdatePage {
  pageTitle = element(by.id('jhi-album-sf-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  titleInput = element(by.id('field_title'));
  referenceInput = element(by.id('field_reference'));
  totalTracksInput = element(by.id('field_totalTracks'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return await this.titleInput.getAttribute('value');
  }

  async setReferenceInput(reference) {
    await this.referenceInput.sendKeys(reference);
  }

  async getReferenceInput() {
    return await this.referenceInput.getAttribute('value');
  }

  async setTotalTracksInput(totalTracks) {
    await this.totalTracksInput.sendKeys(totalTracks);
  }

  async getTotalTracksInput() {
    return await this.totalTracksInput.getAttribute('value');
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

export class AlbumDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-album-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-album'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
