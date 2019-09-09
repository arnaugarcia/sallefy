import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class PlaylistComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-playlist-sf div table .btn-danger'));
  title = element.all(by.css('jhi-playlist-sf div h2#page-heading span')).first();

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

export class PlaylistUpdatePage {
  pageTitle = element(by.id('jhi-playlist-sf-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameInput = element(by.id('field_name'));
  collaborativeInput = element(by.id('field_collaborative'));
  referenceInput = element(by.id('field_reference'));
  descriptionInput = element(by.id('field_description'));
  primaryColorInput = element(by.id('field_primaryColor'));
  publicAccessibleInput = element(by.id('field_publicAccessible'));
  numberSongsInput = element(by.id('field_numberSongs'));
  followersInput = element(by.id('field_followers'));
  ratingInput = element(by.id('field_rating'));
  ownerSelect = element(by.id('field_owner'));
  trackSelect = element(by.id('field_track'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return await this.nameInput.getAttribute('value');
  }

  getCollaborativeInput(timeout?: number) {
    return this.collaborativeInput;
  }
  async setReferenceInput(reference) {
    await this.referenceInput.sendKeys(reference);
  }

  async getReferenceInput() {
    return await this.referenceInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return await this.descriptionInput.getAttribute('value');
  }

  async setPrimaryColorInput(primaryColor) {
    await this.primaryColorInput.sendKeys(primaryColor);
  }

  async getPrimaryColorInput() {
    return await this.primaryColorInput.getAttribute('value');
  }

  getPublicAccessibleInput(timeout?: number) {
    return this.publicAccessibleInput;
  }
  async setNumberSongsInput(numberSongs) {
    await this.numberSongsInput.sendKeys(numberSongs);
  }

  async getNumberSongsInput() {
    return await this.numberSongsInput.getAttribute('value');
  }

  async setFollowersInput(followers) {
    await this.followersInput.sendKeys(followers);
  }

  async getFollowersInput() {
    return await this.followersInput.getAttribute('value');
  }

  async setRatingInput(rating) {
    await this.ratingInput.sendKeys(rating);
  }

  async getRatingInput() {
    return await this.ratingInput.getAttribute('value');
  }

  async ownerSelectLastOption(timeout?: number) {
    await this.ownerSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async ownerSelectOption(option) {
    await this.ownerSelect.sendKeys(option);
  }

  getOwnerSelect(): ElementFinder {
    return this.ownerSelect;
  }

  async getOwnerSelectedOption() {
    return await this.ownerSelect.element(by.css('option:checked')).getText();
  }

  async trackSelectLastOption(timeout?: number) {
    await this.trackSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async trackSelectOption(option) {
    await this.trackSelect.sendKeys(option);
  }

  getTrackSelect(): ElementFinder {
    return this.trackSelect;
  }

  async getTrackSelectedOption() {
    return await this.trackSelect.element(by.css('option:checked')).getText();
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

export class PlaylistDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-playlist-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-playlist'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
