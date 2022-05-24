import { Browser } from "../lib/browser";
import { WebComponent } from "../lib/components";
import { findBy, Page } from "../lib/page";

export class IndexPage extends Page {

  constructor(browser: Browser) {
    super(browser)
  }

  @findBy("xpath", "//div[text()='Simple Todo App']")
  public appTitle: WebComponent

  @findBy("xpath", "//div[@class='header']//button")
  public authButton: WebComponent
}