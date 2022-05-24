import { Browser } from '../lib/browser'
import { IndexPage, LoginPage, DashboardPage } from '../pages'

describe('User logs into the todo app and see his/her own todos', () => {

  let browser: Browser
  let indexPage: IndexPage
  let loginPage: LoginPage
  let dashboardPage: DashboardPage
  
  beforeAll(() => {
    // build browser
    browser = new Browser()

    // instantiate page objects
    indexPage = new IndexPage(browser)
    loginPage = new LoginPage(browser)
    dashboardPage = new DashboardPage(browser)
  })
  
  afterAll(async () => {
    await browser.close()
  })

  describe('Access to the URL of this app', () => {
    beforeAll(async () => {
      await indexPage.navigate()
    })

    it('should show the index page', async () => {
      expect(await indexPage.appTitle.isDisplayed()).toBe(true)
    })

    it("should show 'Log In' on the header", async () => {
      expect(await indexPage.authButton.getText()).toBe("Log In")
    })
  })

  describe("Click 'Log In' button ", () => {
    beforeAll(async () => {
      await indexPage.authButton.click()
    })

    it("should show Login form", async () => {
      expect(await loginPage.usernameInput.isDisplayed()).toBe(true)
      expect(await loginPage.passwordInput.isDisplayed()).toBe(true)
    })
  })

  describe("Enter wrong username & password into form", () => {
    beforeAll(async () => {
      await loginPage.submitAuthInfo('wrong-username', 'wrong-password')
    })

    it("should show dialog that says 'Incorrect username or password'", async () => {
      const alertText = await browser.acceptConfirm()
      expect(alertText).toBe("Incorrect username or password.")
    })
  })

  describe("Enter correct username & password into form", () => {
    beforeAll(async () => {
      await loginPage.submitAuthInfo('Katsumi', 'MyCoolPass')
    })

    it("should show todo dashboard", async () => {
      expect(await dashboardPage.pageTitle.getText()).toBe("Dashboard")
    })
    
    it("should show user's todo list", async () => {
      const myTodo = dashboardPage.findTodoCardByTitle('Watch Seven Samurai')
      expect(await myTodo.isDisplayed()).toBe(true)
    })
  })

  describe("Hit 'Log out' button on the header", () => {
    beforeAll(async () => {
      await dashboardPage.logoutButton.click()
    })

    it("should show the index page", async () => {
      expect(await indexPage.appTitle.isDisplayed()).toBe(true)
    })
  })
})