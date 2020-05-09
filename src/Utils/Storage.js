class Storage {
  constructor() {
    this.userUID = 'ttsUser'
  }

  // all token storage management
  getToken = () => localStorage.getItem(this.userUID)
  setToken = (id) => localStorage.setItem(this.userUID, id)

  // clear storage data for current user
  clear = () => localStorage.clear()
}

export default new Storage()
