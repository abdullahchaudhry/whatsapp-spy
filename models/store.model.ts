export interface StoreModel {
  updateStatus: (status: string) => void
  getStatus: () => string
  hasStatusChanged: (status: string) => boolean
}
