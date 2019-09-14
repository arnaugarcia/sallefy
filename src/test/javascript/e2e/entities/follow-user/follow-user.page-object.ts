import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class FollowUserComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-follow-user div table .btn-danger'));
  title = element.all(by.css('jhi-follow-user div h2#page-heading span')).first();

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

export class FollowUserUpdatePage {
  pageTitle = element(by.id('jhi-follow-user-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  likedInput = element(by.id('field_liked'));
  dateInput = element(by.id('field_date'));
  followedSelect = element(by.id('field_followed'));
  userSelect = element(by.id('field_user'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  getLikedInput(timeout?: number) {
    return this.likedInput;
  }
  async setDateInput(date) {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput() {
    return await this.dateInput.getAttribute('value');
  }

  async followedSelectLastOption(timeout?: number) {
    await this.followedSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async followedSelectOption(option) {
    await this.followedSelect.sendKeys(option);
  }

  getFollowedSelect(): ElementFinder {
    return this.followedSelect;
  }

  async getFollowedSelectedOption() {
    return await this.followedSelect.element(by.css('option:checked')).getText();
  }

  async userSelectLastOption(timeout?: number) {
    await this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect(): ElementFinder {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return await this.userSelect.element(by.css('option:checked')).getText();
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

export class FollowUserDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-followUser-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-followUser'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
