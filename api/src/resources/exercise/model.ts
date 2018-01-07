import * as Sequelize from 'sequelize'
import db from '../../connections/db'

const Exersize = db.define('exercise', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: Sequelize.TEXT,
})

export default Exersize
