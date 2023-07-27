export enum AlertStatus {
  error = 'error'
}

export interface IAlertModel {
  message: string
  status: AlertStatus
  date: Date
}
