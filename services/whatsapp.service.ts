import { Page } from 'puppeteer'

import { Status, XPaths } from '@models'

export class WhatsAppService {
  private status = Status.PENDING
  private timesOnline = 0

  constructor(private page: Page) {}

  public updateStatus(newStatus: Status): void {
    const statuses = [Status.CONTACT_INFO, Status.OFFLINE, Status.PENDING]
    if (statuses.includes(this.status) && newStatus === Status.ONLINE) {
      this.timesOnline += 1
    }
    this.status = newStatus
  }

  public hasStatusChanged(status: Status): boolean {
    return status !== this.status ? true : false
  }

  public getTimesOnline() {
    return this.timesOnline
  }

  public async getStatus(): Promise<Status> {
    try {
      const statusElement = await this.page.$x(XPaths.MAIN)
      const statusElementText = await statusElement[0].evaluate((node: Element) => node.textContent) as Status

      if (statusElementText === Status.CONTACT_INFO) {
        return Status.OFFLINE
      }
      return statusElementText
    } catch (err) {
      return Status.OFFLINE
    }
  }

  public async getUsername() {
    try {
      const usernameElement = await this.page.$x(XPaths.USERNAME)
      const username = await usernameElement[0].evaluate((node: Element) => node.innerHTML)
      return username
    } catch (err) {
      return null
    }
  }
}
