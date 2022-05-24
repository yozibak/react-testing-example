import { Browser } from '../lib/browser'
import { loginAsTestUser } from '../lib/utils'
import { DashboardPage, DetailPage } from '../pages'

describe("User creates new todo and see its details, then go back to dashboard", () => {

  let browser: Browser
  let dashboardPage: DashboardPage
  let detailPage: DetailPage

  beforeAll(async () => {
    browser = new Browser()
    dashboardPage = new DashboardPage(browser)
    detailPage = new DetailPage(browser)
    await loginAsTestUser(browser)
  })

  afterAll(async () => {
    await browser.close()
  })

  describe("Click on the plus button ", () => {
    beforeAll(async () => {
      await dashboardPage.addTodoButton.click()
    })

    it("should show new todo form ", async () => {
      expect(await dashboardPage.todoTitleInput.isDisplayed()).toBe(true)
      expect(await dashboardPage.todoMemoInput.isDisplayed()).toBe(true)
      expect(await dashboardPage.addTodoButton.isDisplayed()).toBe(false)
    })
  })

  // Test data
  const newTodo = {
    title: "Buy some donuts",
    memo: "I'm cravin' it"
  }

  describe("Enter new todo title & some memos on it, then submit", () => {
    beforeAll(async () => {
      await dashboardPage.createNewTodo(newTodo)
    })

    it("should show new todo on the list", async () => {
      const newTodoCard = dashboardPage.findTodoCardByTitle(newTodo.title)
      expect(await newTodoCard.isDisplayed()).toBe(true)
    })

    it("should hide new-todo form ", async () => {
      expect(await dashboardPage.todoTitleInput.isDisplayed()).toBe(false)
      expect(await dashboardPage.todoMemoInput.isDisplayed()).toBe(false)
    })
  })

  describe("Click Todo's title link", () => {
    beforeAll(async () => {
      await dashboardPage.clickTodoByTitle(newTodo.title)
    })

    it("it should show the todo detail page",async () => {
      expect(await detailPage.pageTitle.getText()).toBe("Todo Detail")
    })

    it("should show todo's title & memo", async () => {
      expect(await detailPage.todoTitle.getText()).toBe(newTodo.title)
      expect(await detailPage.todoMemo.getText()).toBe(newTodo.memo)
    })
  })

  describe("Click go-back text", () => {
    beforeAll(async () => {
      await detailPage.backToDashboard.click()
    })

    it("should show dashboard page", async () => {
      expect(await dashboardPage.pageTitle.isDisplayed()).toBe(true)
      expect(await dashboardPage.findTodoCardByTitle(newTodo.title).isDisplayed()).toBe(true)
    })
  })
})