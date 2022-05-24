import 'chromedriver'
import { Builder, ThenableWebDriver, By, WebElementPromise, until, Capabilities } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome'
import { DriverConfig } from './config';

/**
 * Singleton class for handling browser interactions.
 */
export class Browser {
  private driver: ThenableWebDriver

  public constructor(
    headless: boolean = DriverConfig.headless,
    screenSize: { width: number; height: number } = DriverConfig.screenSize,
    private elementWaitSecs: number = DriverConfig.elementWaitSecs
  ) {
    let options = new chrome.Options()
    if (headless) {
      options = options.headless()
    }
    this.driver = new Builder()
      .withCapabilities(Capabilities.chrome())
      .setChromeOptions(options.windowSize(screenSize))
      .build()
  }

  /**
   * Navigate to the desired path. It reloads the entire page itself,
   * not like history.push() of `React-dom-router`
   * @param url where you want it to go
   */
  public async navigate(url: string): Promise<void> {
    try {
      await this.driver.get(url)
    } catch (e) {
      console.error(e)
      throw new Error('URL does not respond')
    }
  }

  /**
   *
   * returns selenium's Element Promise,
   * which accepts actions(clicks, sendKeys) when the element found
   *
   * When element is not found (or ensure-ing non-existing elements), it finally times out
   * but until `this.elementWaitSecs` comes, it tries to find elemnt for each 0.5 milliseconds
   *
   * @param selector CSS or XPath selector, 
   * for css provide sth like `div.someClass` or `input[name='email']`
   * for xpath "//div[text()='Welcome!']"
   */
  public findElementBy(method: 'css' | 'xpath', selector: string): WebElementPromise {
    const find = method === 'css' ? By.css : By.xpath
    return this.driver.wait(
      until.elementLocated(find(selector)),
      this.elementWaitSecs * 1000,
      `Time out after ${this.elementWaitSecs} secs. (thrown by finding ${selector})`,
      500 // check if element is available each 0.5 second
    )
  }

  public async acceptConfirm() {
    await this.driver.wait(until.alertIsPresent())
    const alert = await this.driver.switchTo().alert()
    const alertText = await alert.getText()
    await alert.accept()
    return alertText
  }

  public async sleep(ms?: number) {
    return new Promise((r) => setTimeout(r, ms || 10000))
  }

  public async close(): Promise<void> {
    await this.driver.quit()
  }
}
