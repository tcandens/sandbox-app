import { connect } from '../../connections/mongo'

const users = connect().then(db => db.collection('users'))

export default users

// const User = db.define('user', {
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   email: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   authProvider: {
//     type: Sequelize.CHAR(24),
//     allowNull: false,
//   },
//   authId: {
//     type: Sequelize.NUMERIC,
//     allowNull: false,
//   },
//   firstName: Sequelize.STRING,
//   lastName: Sequelize.STRING,
// })
