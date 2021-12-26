import puppeteer from 'puppeteer'

import { OptionsModel, XPaths } from '@models'
import { WhatsAppService } from '@services'

import { postData } from '@helpers'

export default async function app(options: OptionsModel) {
  const {
    USER_DATA_DIR,
    PAGE_URL,
    TIMEOUT,
    TARGET_MOBILE_NUMBER,
    NODE_ENV,
    USER_AGENT,
  } = options
  console.log(`Launching browser...`)
  const browser = await puppeteer.launch({
    args: [
      `--user-data-dir=${USER_DATA_DIR}`,
      '--window-size=1920,1080',
      '--ignore-certificate-errors',
      '--allow-running-insecure-content',
      `--user-agent=${USER_AGENT}`,
    ],
    headless: NODE_ENV === 'production' ? true : false,
  })

  console.log(`Opening new page...`)
  const page = await browser.newPage()
  const whatsappService = new WhatsAppService(page)

  console.log(`Navigating to ${PAGE_URL}...`)
  await page.goto(`${PAGE_URL}`, {
    timeout: 0,
    waitUntil: 'networkidle0',
  })

  console.log('Logging into WhatsApp Web...')
  const waitForSelectorOptions = { timeout: TIMEOUT }
  await page.waitForSelector('#side', waitForSelectorOptions)

  console.log(`Typing contact number ${TARGET_MOBILE_NUMBER}...`)
  const searchBox = await page.$x(XPaths.SEARCH_BOX)
  await searchBox[0].click()
  await page.keyboard.type(TARGET_MOBILE_NUMBER)
  await page.keyboard.press('Enter')

  const username = await whatsappService.getUsername()

  console.log(`Logging started for ${username}...`)
  while (true) {
    await page.waitForTimeout(1000)
    try {
      const status = await whatsappService.getStatus()
      const date = new Date()
      const timestamp = date.toLocaleTimeString()
      if (whatsappService.hasStatusChanged(status)) {
        whatsappService.updateStatus(status)

        await postData({
          status,
          timestamp,
        })

        console.log(`[${timestamp}]: ${status}, timesOnline: ${whatsappService.getTimesOnline()}`)
      }
    } catch (err) {}
  }
}
