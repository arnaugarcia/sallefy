import { element, by, ElementFinder } from 'protractor';

export class LikeTrackComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-like-track div table .btn-danger'));
  title = element.all(by.css('jhi-like-track div h2#page-heading span')).first();

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

export class LikeTrackUpdatePage {
  pageTitle = element(by.id('jhi-like-track-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  likedInput = element(by.id('field_liked'));
  dateInput = element(by.id('field_date'));
  userSelect = element(by.id('field_user'));
  trackSelect = element(by.id('field_track'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  getLikedInput(): ElementFinder {
    return this.likedInput;
  }
  async setDateInput(date: string): Promise<void> {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput(): Promise<string> {
    return await this.dateInput.getAttribute('value');
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

export class LikeTrackDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-likeTrack-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-likeTrack'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
