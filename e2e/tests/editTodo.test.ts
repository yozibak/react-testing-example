import { WebElementPromise } from 'selenium-webdriver'
import { Browser } from '../lib/browser'
import { WebComponent } from '../lib/components'
import { loginAsTestUser } from '../lib/utils'
import { DashboardPage } from '../pages'

describe("User makes todo 'completed', but changed his mind and revert it. but finally delete it", () => {

  let browser: Browser
  let dashboardPage: DashboardPage

  beforeAll(async () => {
    browser = new Browser()
    dashboardPage = new DashboardPage(browser)
    await loginAsTestUser(browser)
  })

  afterAll(async () => {
    await browser.close()
  })

  // interact with this todo.
  const todoTitle = 'Write e2e tests with Selenium!!'
  let todoCard: WebComponent

  describe("Click checkbox on the left side of the todo card", () => {

    beforeAll(async () => {
      todoCard = dashboardPage.findTodoCardByTitle(todoTitle)
      expect(await todoCard.isDisplayed()).toBe(true)
      await dashboardPage.toggleTodoStatus(todoTitle)
    })
    
    it("should change the todo card's color", async () => {
      const classes = await todoCard.getAttr('class')
      expect(classes.includes('completed')).toBe(true)
    })

    it("should show 'checked' checkbox", async () => {
      const checkbox = dashboardPage.getTodoCheckBox(todoTitle)
      expect(await checkbox.getAttr('checked')).toBe('true')
    })
  })

  describe("Click checkbox again", () => {

    beforeAll(async () => {
      await dashboardPage.toggleTodoStatus(todoTitle)
    })

    it("should revert todo card's style", async () => {
      const classes = await todoCard.getAttr('class')
      expect(classes.includes('completed')).toBe(false)
    })
  })

  describe("Click 'Discard' button on the right side of todo card", () => {

    beforeAll(async () => {
      await dashboardPage.discardTodo(todoTitle)
    })

    it("should no longer show the todo", async () => {
      expect(await todoCard.isDisplayed()).toBe(false)
    })
  })
})