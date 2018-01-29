import * as r from 'rethinkdb'

let connection

const details = {
  host: 'rethinkdb',
  port: 28015,
  db: 'trainer',
}

export async function connect () {
  if (connection) return connection
  connection = await r.connect(details)
  console.dir(connection)
  return connection
}
