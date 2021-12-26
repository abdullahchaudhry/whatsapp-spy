import { ConfigModel } from '@models'
import { PuppeteerOptions } from '@models'

export interface OptionsModel extends ConfigModel {
  PAGE_URL: PuppeteerOptions.PAGE_URL,
  TIMEOUT: PuppeteerOptions.TIMEOUT,
  USER_AGENT: PuppeteerOptions.USER_AGENT,
}
