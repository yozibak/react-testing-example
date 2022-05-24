
import { Browser } from "../lib/browser";
import { WebComponent } from "../lib/components";
import { findBy, Page } from "../lib/page";

export class DetailPage extends Page {

  constructor(browser: Browser) {
    super(browser)
    this.setUrl('/detail')
  }

  @findBy("css", "div.page-title")
  public pageTitle: WebComponent

  @findBy("xpath", "//body//div[contains(@class,'detail')]/div[1]")
  public todoTitle: WebComponent

  @findBy("xpath", "//body//div[contains(@class,'detail')]/div[2]")
  public todoMemo: WebComponent

  @findBy("xpath", "//body//div[@class='back-to-dashboard']/a")
  public backToDashboard: WebComponent
}