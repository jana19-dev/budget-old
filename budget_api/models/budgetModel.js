import mongoose, { Schema } from 'mongoose'
import User from '../models/userModel'
import Account from './accountModel'
import Group from './groupModel'
import Payee from './payeeModel'

const options = {
  timestamps: true
}

const budgetSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  payeeIDs: [
    { type: String }
  ],
  accountIDs: [
    { type: String }
  ],
  groupIDs: [
    { type: String }
  ],
  userID: {
    type: String,
    required: true
  }
}, options)


budgetSchema.post('save', async budget => {
  if (budget) {
    await User.findByIdAndUpdate(budget.userID, { $push: { budgetIDs: budget.id } })
  } 
});

budgetSchema.post('findOneAndRemove', async budget => {
  if (budget) {
    await Account.remove({budgetID: budget.id})
    await Group.remove({budgetID: budget.id})
    await Payee.remove({budgetID: budget.id})
    await User.findByIdAndUpdate(budget.userID, { $pull: { budgetIDs: budget.id } })
  } 
});


export default mongoose.model('budget', budgetSchema)