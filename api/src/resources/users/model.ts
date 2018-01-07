import db from '../../connections/db'
import * as Sequelize from 'sequelize'

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  authProvider: {
    type: Sequelize.CHAR(24),
    allowNull: false,
  },
  authId: {
    type: Sequelize.NUMERIC,
    allowNull: false,
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
})

User.sync({ force: true })

export default User
