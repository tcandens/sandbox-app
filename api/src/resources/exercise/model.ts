import * as Sequelize from 'sequelize'
import db from '../../connections/db'
import User from '../users/model'

const Exercise = db.define('exercise', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: Sequelize.TEXT,
})

Exercise.belongsTo(User)

export default Exercise
