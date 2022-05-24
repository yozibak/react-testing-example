import { Browser } from "./browser"
import { ROOT_URL } from "./config"
import 'reflect-metadata'

/**
 * Base class for each Page Object (in the context of Page-Object-Model pattern)
 *
 * Each Page object holds its url path,
 * elements as properties (e.g. Log-in button, text input),
 * and interactions as methods(e.g. click button, form submit).
 */
export abstract class Page {

  /**
   * path for this page
   */
  private url: string = ROOT_URL

  /**
   * configure page's url (typically in the constructor),
   * @param path path starting from '/'
   */
  protected setUrl(path: string) {
    this.url = ROOT_URL + path
  }

  public async navigate(): Promise<void> {
    await this.browser.navigate(this.url)
  }
  
  public constructor(protected browser: Browser) {}
}


/**
 * decorator for page object's element properties.
 * getting page.element calls the get function set by this decorator.
 *
 * For decorators, see: https://www.typescriptlang.org/docs/handbook/decorators.html
 */
export function findBy(method: 'css' | 'xpath', selector: string) {
  return (target: any, propertyKey: string) => {
    const WebComp = Reflect.getMetadata('design:type', target, propertyKey)
    Object.defineProperty(target, propertyKey, {
      configurable: true,
      enumerable: true,
      get: function () {
        const webElementPromise = (this as any).browser.findElementBy(method, selector)
        return new WebComp(webElementPromise)
      },
    })
  }
}
