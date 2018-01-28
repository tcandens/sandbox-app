import Exercise from './model'
import { Op } from 'sequelize'
import * as Dataloader from 'dataloader'
import * as createDebug from 'debug'

Exercise.sync({ force: true })
