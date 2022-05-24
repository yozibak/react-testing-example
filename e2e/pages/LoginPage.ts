import { Browser } from "../lib/browser";
import { TextInput, WebComponent } from "../lib/components";
import { findBy, Page } from "../lib/page";

export class LoginPage extends Page {

  constructor(browser: Browser) {
    super(browser)
    this.setUrl('/login')
  }

  @findBy("css", 'input[id="username-input"]')
  public usernameInput: TextInput

  @findBy("css", 'input[id="password-input"]')
  public passwordInput: TextInput

  @findBy("xpath", "//button[text()='Submit']")
  public submitButton: WebComponent

  public async submitAuthInfo(username: string, password: string) {
    await this.usernameInput.clear()
    await this.usernameInput.type(username)
    await this.passwordInput.clear()
    await this.passwordInput.type(password)
    await this.submitButton.click()
  }
}
