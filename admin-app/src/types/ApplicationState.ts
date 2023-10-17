export default interface ApplicationState {
  data: {
    navMenuIsOpened: boolean
    appURL: string
    serverURL: string
  }
  status: {
    state: string
  }
}
