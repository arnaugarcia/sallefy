import { element, by, ElementFinder } from 'protractor';

export class TrackComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-track div table .btn-danger'));
  title = element.all(by.css('jhi-track div h2#page-heading span')).first();

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class TrackUpdatePage {
  pageTitle = element(by.id('jhi-track-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameInput = element(by.id('field_name'));
  ratingInput = element(by.id('field_rating'));
  urlInput = element(by.id('field_url'));
  popularityInput = element(by.id('field_popularity'));
  thumbnailInput = element(by.id('field_thumbnail'));
  createdAtInput = element(by.id('field_createdAt'));
  releasedInput = element(by.id('field_released'));
  durationInput = element(by.id('field_duration'));
  colorInput = element(by.id('field_color'));
  userSelect = element(by.id('field_user'));
  genreSelect = element(by.id('field_genre'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setRatingInput(rating: string): Promise<void> {
    await this.ratingInput.sendKeys(rating);
  }

  async getRatingInput(): Promise<string> {
    return await this.ratingInput.getAttribute('value');
  }

  async setUrlInput(url: string): Promise<void> {
    await this.urlInput.sendKeys(url);
  }

  async getUrlInput(): Promise<string> {
    return await this.urlInput.getAttribute('value');
  }

  async setPopularityInput(popularity: string): Promise<void> {
    await this.popularityInput.sendKeys(popularity);
  }

  async getPopularityInput(): Promise<string> {
    return await this.popularityInput.getAttribute('value');
  }

  async setThumbnailInput(thumbnail: string): Promise<void> {
    await this.thumbnailInput.sendKeys(thumbnail);
  }

  async getThumbnailInput(): Promise<string> {
    return await this.thumbnailInput.getAttribute('value');
  }

  async setCreatedAtInput(createdAt: string): Promise<void> {
    await this.createdAtInput.sendKeys(createdAt);
  }

  async getCreatedAtInput(): Promise<string> {
    return await this.createdAtInput.getAttribute('value');
  }

  async setReleasedInput(released: string): Promise<void> {
    await this.releasedInput.sendKeys(released);
  }

  async getReleasedInput(): Promise<string> {
    return await this.releasedInput.getAttribute('value');
  }

  async setDurationInput(duration: string): Promise<void> {
    await this.durationInput.sendKeys(duration);
  }

  async getDurationInput(): Promise<string> {
    return await this.durationInput.getAttribute('value');
  }

  async setColorInput(color: string): Promise<void> {
    await this.colorInput.sendKeys(color);
  }

  async getColorInput(): Promise<string> {
    return await this.colorInput.getAttribute('value');
  }

  async userSelectLastOption(): Promise<void> {
    await this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userSelectOption(option: string): Promise<void> {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect(): ElementFinder {
    return this.userSelect;
  }

  async getUserSelectedOption(): Promise<string> {
    return await this.userSelect.element(by.css('option:checked')).getText();
  }

  async genreSelectLastOption(): Promise<void> {
    await this.genreSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async genreSelectOption(option: string): Promise<void> {
    await this.genreSelect.sendKeys(option);
  }

  getGenreSelect(): ElementFinder {
    return this.genreSelect;
  }

  async getGenreSelectedOption(): Promise<string> {
    return await this.genreSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class TrackDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-track-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-track'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
