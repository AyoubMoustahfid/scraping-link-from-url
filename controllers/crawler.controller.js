import fs from "fs/promises"
import { puppeteerBoot } from "../helpers/bootstrap/puppeteer.boot.js"
import { noHttpsRegex } from "../helpers/sanitizations/url.sanitization.helper.js"

const keywords = ["hotel", "casablanca"]

export function runFunctionXTimes(callback, interval, repeatTimes) {
  let repeated = 0
  const intervalTask = setInterval(doTask, interval)

  function doTask() {
    if (repeated < repeatTimes) {
      callback()
      repeated += 1
    } else {
      clearInterval(intervalTask)
    }
  }
}

export async function crawler() {
  try {
    const { browser, page } = await puppeteerBoot()

    let domainsList = []

    for (let i = 0; i < 3; i++) {
      await googleQuery(page, keywords, i)
      let websitesDomains = await pageEvaluate(page)
      domainsList.push(websitesDomains)
      console.log('domains', websitesDomains)
      
      await screenshot(page)
      await domainNamesFile(websitesDomains)
    }

    await browser.close()
    // return domainsList
  } catch (e) {
    console.log(e)
  }
}

async function googleQuery(page) {
  await page.goto(`
  https://www.bing.com/search?q=hotel+casablanca&form=ANNH01&refig=debc7848537741d6b602783fc866e1a9
  `)
  // await page.goto(
  //   `https://www.google.com/search?q=${encodeURIComponent(keywords.join(" "))}&start=${
  //     (pageNumber - 1) * 10
  //   }`
  // )
}

async function pageEvaluate(page) {
  const evaluate = await page.evaluate(() => {
    /*global document*/
    const cite = document.querySelectorAll("cite")

    return Array.from(cite).map((i) => i.childNodes[0].data)
  })
  return [...new Set(evaluate)].map((e) => noHttpsRegex(e) + "\n")
}

async function screenshot(page) {
  await page.screenshot({ path: "./public/screenshot.png", fullPage: true })
}

async function domainNamesFile(domains) {
  await fs.appendFile("./public/websiteList.txt", domains.toString())
}