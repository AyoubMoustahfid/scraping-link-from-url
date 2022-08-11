// puppeteer bootstrap.js
import puppeteer from "puppeteer"

export async function puppeteerBoot() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  return { browser, page }
}