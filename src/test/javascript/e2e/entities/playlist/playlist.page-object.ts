import { element, by, ElementFinder } from 'protractor';

export class PlaylistComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-playlist div table .btn-danger'));
  title = element.all(by.css('jhi-playlist div h2#page-heading span')).first();

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

export class PlaylistUpdatePage {
  pageTitle = element(by.id('jhi-playlist-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameInput = element(by.id('field_name'));
  collaborativeInput = element(by.id('field_collaborative'));
  descriptionInput = element(by.id('field_description'));
  primaryColorInput = element(by.id('field_primaryColor'));
  coverInput = element(by.id('field_cover'));
  thumbnailInput = element(by.id('field_thumbnail'));
  publicAccessibleInput = element(by.id('field_publicAccessible'));
  numberSongsInput = element(by.id('field_numberSongs'));
  followersInput = element(by.id('field_followers'));
  ratingInput = element(by.id('field_rating'));
  userSelect = element(by.id('field_user'));
  trackSelect = element(by.id('field_track'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  getCollaborativeInput(): ElementFinder {
    return this.collaborativeInput;
  }
  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async setPrimaryColorInput(primaryColor: string): Promise<void> {
    await this.primaryColorInput.sendKeys(primaryColor);
  }

  async getPrimaryColorInput(): Promise<string> {
    return await this.primaryColorInput.getAttribute('value');
  }

  async setCoverInput(cover: string): Promise<void> {
    await this.coverInput.sendKeys(cover);
  }

  async getCoverInput(): Promise<string> {
    return await this.coverInput.getAttribute('value');
  }

  async setThumbnailInput(thumbnail: string): Promise<void> {
    await this.thumbnailInput.sendKeys(thumbnail);
  }

  async getThumbnailInput(): Promise<string> {
    return await this.thumbnailInput.getAttribute('value');
  }

  getPublicAccessibleInput(): ElementFinder {
    return this.publicAccessibleInput;
  }
  async setNumberSongsInput(numberSongs: string): Promise<void> {
    await this.numberSongsInput.sendKeys(numberSongs);
  }

  async getNumberSongsInput(): Promise<string> {
    return await this.numberSongsInput.getAttribute('value');
  }

  async setFollowersInput(followers: string): Promise<void> {
    await this.followersInput.sendKeys(followers);
  }

  async getFollowersInput(): Promise<string> {
    return await this.followersInput.getAttribute('value');
  }

  async setRatingInput(rating: string): Promise<void> {
    await this.ratingInput.sendKeys(rating);
  }

  async getRatingInput(): Promise<string> {
    return await this.ratingInput.getAttribute('value');
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

  async trackSelectLastOption(): Promise<void> {
    await this.trackSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async trackSelectOption(option: string): Promise<void> {
    await this.trackSelect.sendKeys(option);
  }

  getTrackSelect(): ElementFinder {
    return this.trackSelect;
  }

  async getTrackSelectedOption(): Promise<string> {
    return await this.trackSelect.element(by.css('option:checked')).getText();
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

export class PlaylistDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-playlist-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-playlist'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
