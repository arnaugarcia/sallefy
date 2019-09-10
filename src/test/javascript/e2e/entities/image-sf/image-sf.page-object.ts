import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class ImageComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-image-sf div table .btn-danger'));
  title = element.all(by.css('jhi-image-sf div h2#page-heading span')).first();

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

export class ImageUpdatePage {
  pageTitle = element(by.id('jhi-image-sf-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  urlInput = element(by.id('field_url'));
  heightInput = element(by.id('field_height'));
  thumbnailInput = element(by.id('field_thumbnail'));
  coverInput = element(by.id('field_cover'));
  widthInput = element(by.id('field_width'));
  trackSelect = element(by.id('field_track'));
  playlistSelect = element(by.id('field_playlist'));
  artistSelect = element(by.id('field_artist'));
  albumSelect = element(by.id('field_album'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setUrlInput(url) {
    await this.urlInput.sendKeys(url);
  }

  async getUrlInput() {
    return await this.urlInput.getAttribute('value');
  }

  async setHeightInput(height) {
    await this.heightInput.sendKeys(height);
  }

  async getHeightInput() {
    return await this.heightInput.getAttribute('value');
  }

  getThumbnailInput(timeout?: number) {
    return this.thumbnailInput;
  }
  getCoverInput(timeout?: number) {
    return this.coverInput;
  }
  async setWidthInput(width) {
    await this.widthInput.sendKeys(width);
  }

  async getWidthInput() {
    return await this.widthInput.getAttribute('value');
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

  async artistSelectLastOption(timeout?: number) {
    await this.artistSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async artistSelectOption(option) {
    await this.artistSelect.sendKeys(option);
  }

  getArtistSelect(): ElementFinder {
    return this.artistSelect;
  }

  async getArtistSelectedOption() {
    return await this.artistSelect.element(by.css('option:checked')).getText();
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

export class ImageDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-image-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-image'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
