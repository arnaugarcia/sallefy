import { element, by, ElementFinder } from 'protractor';

export class FollowUserComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-follow-user div table .btn-danger'));
  title = element.all(by.css('jhi-follow-user div h2#page-heading span')).first();

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

export class FollowUserUpdatePage {
  pageTitle = element(by.id('jhi-follow-user-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  dateInput = element(by.id('field_date'));
  followedSelect = element(by.id('field_followed'));
  userSelect = element(by.id('field_user'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDateInput(date: string): Promise<void> {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput(): Promise<string> {
    return await this.dateInput.getAttribute('value');
  }

  async followedSelectLastOption(): Promise<void> {
    await this.followedSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async followedSelectOption(option: string): Promise<void> {
    await this.followedSelect.sendKeys(option);
  }

  getFollowedSelect(): ElementFinder {
    return this.followedSelect;
  }

  async getFollowedSelectedOption(): Promise<string> {
    return await this.followedSelect.element(by.css('option:checked')).getText();
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

export class FollowUserDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-followUser-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-followUser'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
