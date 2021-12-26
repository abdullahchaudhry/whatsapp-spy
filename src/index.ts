import { config, puppeteerOptions } from '@config'
import app from './app'

const options = {
  ...config,
  ...puppeteerOptions,
}

app(options)
  .catch((err: any) => console.error(err))
