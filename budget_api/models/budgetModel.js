import mongoose, { Schema } from 'mongoose'
import User from './userModel'
import Account from './accountModel'
import Group from './groupModel'
import Category from './categoryModel'
import Payee from './payeeModel'
import Transaction from './transactionModel'

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
  await User.findByIdAndUpdate(budget.userID, { $push: { budgetIDs: budget.id } })
})

budgetSchema.post('remove', async budget => {
  await Account.remove({budgetID: budget.id})
  await Category.remove({budgetID: budget.id})
  await Group.remove({budgetID: budget.id})
  await Payee.remove({budgetID: budget.id})
  await Transaction.remove({budgetID: budget.id})
  await User.findByIdAndUpdate(budget.userID, { $pull: { budgetIDs: budget.id } })
})


export default mongoose.model('budget', budgetSchema)