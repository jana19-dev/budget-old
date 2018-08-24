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
    const user = await User.findById(budget.userID)
    await user.update({budgetIDs: [...user.budgetIDs, budget.id]})
  } 
});

budgetSchema.post('remove', async budget => {
  if (budget) {
    await Account.remove({budgetID: budget.id})
    await Group.remove({budgetID: budget.id})
    await Payee.remove({budgetID: budget.id})
    const user = await User.findById(budget.userID)
    await user.update({budgetIDs: user.budgetIDs.filter(budgetID=>budgetID!==budget.id)})
  } 
});


export default mongoose.model('budget', budgetSchema)