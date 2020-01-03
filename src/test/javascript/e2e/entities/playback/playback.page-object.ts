import { element, by, ElementFinder } from 'protractor';

export class PlaybackComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-playback div table .btn-danger'));
  title = element.all(by.css('jhi-playback div h2#page-heading span')).first();

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

export class PlaybackUpdatePage {
  pageTitle = element(by.id('jhi-playback-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  ipInput = element(by.id('field_ip'));
  latitudeInput = element(by.id('field_latitude'));
  longitudeInput = element(by.id('field_longitude'));
  agentSelect = element(by.id('field_agent'));
  dateInput = element(by.id('field_date'));
  userSelect = element(by.id('field_user'));
  trackSelect = element(by.id('field_track'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIpInput(ip: string): Promise<void> {
    await this.ipInput.sendKeys(ip);
  }

  async getIpInput(): Promise<string> {
    return await this.ipInput.getAttribute('value');
  }

  async setLatitudeInput(latitude: string): Promise<void> {
    await this.latitudeInput.sendKeys(latitude);
  }

  async getLatitudeInput(): Promise<string> {
    return await this.latitudeInput.getAttribute('value');
  }

  async setLongitudeInput(longitude: string): Promise<void> {
    await this.longitudeInput.sendKeys(longitude);
  }

  async getLongitudeInput(): Promise<string> {
    return await this.longitudeInput.getAttribute('value');
  }

  async setAgentSelect(agent: string): Promise<void> {
    await this.agentSelect.sendKeys(agent);
  }

  async getAgentSelect(): Promise<string> {
    return await this.agentSelect.element(by.css('option:checked')).getText();
  }

  async agentSelectLastOption(): Promise<void> {
    await this.agentSelect
      .all(by.tagName('option'))
      .last()
      .click();
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

export class PlaybackDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-playback-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-playback'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
