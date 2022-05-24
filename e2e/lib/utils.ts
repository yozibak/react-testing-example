import { IndexPage, LoginPage } from "../pages"
import { Browser } from "./browser"
import { TestUser } from "./config"

export const loginAsTestUser = async (browser:Browser) => {
  const loginPage = new LoginPage(browser)
  await loginPage.navigate()
  await loginPage.submitAuthInfo(TestUser.username, TestUser.password)
}