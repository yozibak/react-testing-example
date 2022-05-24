import { WebElementPromise } from 'selenium-webdriver'

/**
 * class for handling web element interactions 
 * (and also a wrapper for known selenium workarounds)
 * 
 * You can extend methods from selenium's `WebElementPromise`.
 * https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebElementPromise.html
 */
export class WebComponent {
  constructor(protected element: WebElementPromise) {}

  public async click() {
    await this.element.click()
  }

  public async isDisplayed() {
    try {
      return await this.element.isDisplayed()
    } catch (ex) {
      return false
    }
  }

  public async getText() {
    return await this.element.getText()
  }

  public async getAttr(attr: string) {
    return await this.element.getAttribute(attr)
  }
}

export class TextInput extends WebComponent {
  constructor(element: WebElementPromise) {
    super(element)
  }

  public type(text: string | number) {
    return this.element.sendKeys(text)
  }

  public clear() {
    return this.element.clear()
  }
}

export class Button extends WebComponent {
  constructor(element: WebElementPromise) {
    super(element)
  }

  public async isDisabled() {
    try {
      return (await this.element.getAttribute('disabled')) === 'true'
    } catch (ex) {
      return false
    }
  }
}
