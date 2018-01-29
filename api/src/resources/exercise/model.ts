import * as r from 'rethinkdb'

class Exercise {
  private conn
  constructor () {
    this.conn.table('exercises')
  }
  getAll () {
    return this.conn.insert({
      name: 'Fucker',
    })
  }
}

export default new Exercise()
