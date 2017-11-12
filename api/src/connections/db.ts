import * as Sequelize from 'sequelize'

const sequelize = new Sequelize('drainer', 'trainer', 'tr@1n3r', {
  host: 'db',
  dialect: 'postgres',
})

export default sequelize
