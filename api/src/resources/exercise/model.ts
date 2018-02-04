import * as r from 'rethinkdb'
import { connect } from '../../connections/rethinkdb'

class Exercise {
  private conn
  constructor () {
    this.conn = connect().then(conn => {
      r.tableCreate('exercises').run(conn)
        .then(() => console.log('Creating table `exercises'))
        .catch(() => console.log('Table `exercises` already exists.'))
      return conn
    })
  }
  fromUser (userId) {
    return this.conn.then(conn => {
      return r.table('exercises').getAll(userId, { index: 'userId' }).run(conn).then(cursor => {
        return cursor.toArray()
      }).then(rows => {
        console.dir(rows)
        return rows[0]
      })
    })
  }
}

export default new Exercise()
