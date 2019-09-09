import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class TrackComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-track-sf div table .btn-danger'));
  title = element.all(by.css('jhi-track-sf div h2#page-heading span')).first();

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

export class TrackUpdatePage {
  pageTitle = element(by.id('jhi-track-sf-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameInput = element(by.id('field_name'));
  raitingInput = element(by.id('field_raiting'));
  referenceInput = element(by.id('field_reference'));
  durationInput = element(by.id('field_duration'));
  primaryColorInput = element(by.id('field_primaryColor'));
  playlistSelect = element(by.id('field_playlist'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return await this.nameInput.getAttribute('value');
  }

  async setRaitingInput(raiting) {
    await this.raitingInput.sendKeys(raiting);
  }

  async getRaitingInput() {
    return await this.raitingInput.getAttribute('value');
  }

  async setReferenceInput(reference) {
    await this.referenceInput.sendKeys(reference);
  }

  async getReferenceInput() {
    return await this.referenceInput.getAttribute('value');
  }

  async setDurationInput(duration) {
    await this.durationInput.sendKeys(duration);
  }

  async getDurationInput() {
    return await this.durationInput.getAttribute('value');
  }

  async setPrimaryColorInput(primaryColor) {
    await this.primaryColorInput.sendKeys(primaryColor);
  }

  async getPrimaryColorInput() {
    return await this.primaryColorInput.getAttribute('value');
  }

  async playlistSelectLastOption(timeout?: number) {
    await this.playlistSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async playlistSelectOption(option) {
    await this.playlistSelect.sendKeys(option);
  }

  getPlaylistSelect(): ElementFinder {
    return this.playlistSelect;
  }

  async getPlaylistSelectedOption() {
    return await this.playlistSelect.element(by.css('option:checked')).getText();
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

export class TrackDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-track-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-track'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
