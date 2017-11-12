import * as Sequelize from 'sequelize'

const sequelize = new Sequelize('trainer', 'trainer', 'tr@1n3r', {
  host: 'db',
  dialect: 'postgres',
})

export default sequelize
