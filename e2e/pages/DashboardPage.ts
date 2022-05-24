import { Button, TextInput, WebComponent } from "../lib/components"
import { Browser } from "../lib/browser"
import { findBy, Page } from "../lib/page"

export class DashboardPage extends Page {

  constructor(browser: Browser) {
    super(browser)
    this.setUrl('/dashboard')
  }

  @findBy("css", "div[class='page-title']")
  public pageTitle: WebComponent

  @findBy("xpath", "//div[@class='header']//button[text()='Log Out']")
  public logoutButton: WebComponent

  //
  // Todo
  //

  private locateTodoCardByTitle(todoTitle: string) {
    return `//div[contains(@class, 'todo-cards')]/div[contains(@class, 'todo') and .//*[text()='${todoTitle}']]`
  }

  public findTodoCardByTitle(todoTitle: string) {
    const loc = this.locateTodoCardByTitle(todoTitle)
    const promise = this.browser.findElementBy("xpath", loc)
    return new WebComponent(promise)
  }

  public async clickTodoByTitle(todoTitle: string) {
    await this.browser.findElementBy("xpath", `//body//a[text()='${todoTitle}']`).click()
  }

  public getTodoCheckBox(todoTitle: string) {
    const loc = this.locateTodoCardByTitle(todoTitle)
    const promise = this.browser.findElementBy("xpath", `${loc}//input[@type='checkbox']`)
    return new WebComponent(promise)
  }

  public async toggleTodoStatus(todoTitle: string) {
    await this.getTodoCheckBox(todoTitle).click()
  }

  public async discardTodo(todoTitle: string) {
    const loc = this.locateTodoCardByTitle(todoTitle)
    await this.browser.findElementBy("xpath", `${loc}//button[@class='discard']`).click()
  }

  //
  // Form
  //

  @findBy("css", "button.add-todo")
  public addTodoButton: WebComponent

  @findBy("css", "input[id='todo-title']")
  public todoTitleInput: TextInput

  @findBy("css", "input[id='todo-memo']")
  public todoMemoInput: TextInput

  @findBy("xpath", "//body//button[@type='submit' and text()='Add']")
  public todoSubmitButton: Button

  public async createNewTodo({title, memo}: { title: string, memo: string }) {
    await this.todoTitleInput.type(title)
    await this.todoMemoInput.type(memo)
    await this.todoSubmitButton.click()
  }

}