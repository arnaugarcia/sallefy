import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class LikeUserComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-like-user div table .btn-danger'));
  title = element.all(by.css('jhi-like-user div h2#page-heading span')).first();

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

export class LikeUserUpdatePage {
  pageTitle = element(by.id('jhi-like-user-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  likedInput = element(by.id('field_liked'));
  dateInput = element(by.id('field_date'));
  likedUserSelect = element(by.id('field_likedUser'));
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

  async likedUserSelectLastOption(timeout?: number) {
    await this.likedUserSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async likedUserSelectOption(option) {
    await this.likedUserSelect.sendKeys(option);
  }

  getLikedUserSelect(): ElementFinder {
    return this.likedUserSelect;
  }

  async getLikedUserSelectedOption() {
    return await this.likedUserSelect.element(by.css('option:checked')).getText();
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

export class LikeUserDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-likeUser-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-likeUser'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
