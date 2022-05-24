import { ThenableWebDriver, Builder, Capabilities, By, until } from 'selenium-webdriver'
import chrome from 'selenium-webdriver/chrome'

// Configs
const driverConfig = {
  headless: false,
  screenSize: {
    width: 1200,
    height: 800,
  },
}
const ROOT_URL = 'http://localhost:3000'

describe.skip('User logs into the todo app and see his/her own todos', () => {

  // driver object
  let webDriver: ThenableWebDriver
  
  beforeAll(() => {
    let options = new chrome.Options()
    if (driverConfig.headless) {
      options = options.headless()
    }
    webDriver = new Builder()
      .withCapabilities(Capabilities.chrome())
      .setChromeOptions(options.windowSize(driverConfig.screenSize))
      .build()
  })
  
  afterAll(async () => {
    await webDriver.quit()
  })

  describe('Access to the URL of this app', () => {
    beforeAll(async () => {
      await webDriver.get(ROOT_URL)
    })

    it('should show the index page', async () => {
      const appTitle = webDriver.findElement(By.xpath('//div[text()="Simple Todo App"]'))
      expect(await appTitle.isDisplayed()).toBe(true)
    })

    it("should show 'Log In' on the header", async () => {
      const loginButton = webDriver.findElement(By.xpath('//div[@class="header"]//button'))
      expect(await loginButton.getText()).toBe('Log In')
    })
  })

  describe("Click 'Log In' button ", () => {
    beforeAll(async () => {
      const loginButton = webDriver.findElement(By.xpath('//div[@class="header"]//button'))
      await loginButton.click()
    })

    it("should show Login form", async () => {
      const usernameInput = webDriver.findElement(By.css('input[id="username-input"]'))
      const passwordInput = webDriver.findElement(By.css('input[id="password-input"]'))
      expect(await usernameInput.isDisplayed()).toBe(true)
      expect(await passwordInput.isDisplayed()).toBe(true)
    })
  })

  describe("Enter wrong username & password into form", () => {
    beforeAll(async () => {
      const usernameInput = webDriver.findElement(By.css('input[id="username-input"]'))
      const passwordInput = webDriver.findElement(By.css('input[id="password-input"]'))
      const submitButton = webDriver.findElement(By.xpath("//button[text()='Submit']"))
      await usernameInput.sendKeys('wrong-username')
      await passwordInput.sendKeys('wrong-pass')
      await submitButton.click()
    })

    it("should show dialog that says 'Incorrect username or password'", async () => {
      await webDriver.wait(until.alertIsPresent())
      const alert = await webDriver.switchTo().alert()
      expect(await alert.getText()).toBe("Incorrect username or password.")
      alert.accept()
    })
  })

  describe("Enter correct username & password into form", () => {
    beforeAll(async () => {
      const usernameInput = webDriver.findElement(By.css('input[id="username-input"]'))
      const passwordInput = webDriver.findElement(By.css('input[id="password-input"]'))
      const submitButton = webDriver.findElement(By.xpath("//button[text()='Submit']"))
      await usernameInput.clear()
      await usernameInput.sendKeys('Katsumi')
      await passwordInput.clear()
      await passwordInput.sendKeys('MyCoolPass')
      await submitButton.click()
    })

    it("should show todo dashboard", async () => {
      const pageTitle = webDriver.findElement(By.css("div[class='page-title']"))
      expect(await pageTitle.getText()).toBe("Dashboard")
    })
    
    it("should show user's todo list", async () => {
      const myTodoTitle = 'Watch Seven Samurai'
      const myTodo = webDriver.findElement(By.xpath(`//div[contains(@class, 'todo') and .//*[text()='${myTodoTitle}']]`))
      expect(await myTodo.isDisplayed()).toBe(true)
    })
  })

  describe("Hit 'Log out' button on the header", () => {
    beforeAll(async () => {
      const logoutButton = webDriver.findElement(By.xpath("//div[@class='header']//button[text()='Log Out']"))
      await logoutButton.click()
    })

    it("should show the index page", async () => {
      const appTitle = webDriver.findElement(By.xpath('//div[text()="Simple Todo App"]'))
      expect(await appTitle.isDisplayed()).toBe(true)    
    })
  })
})