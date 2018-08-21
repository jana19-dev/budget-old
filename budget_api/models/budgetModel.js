import mongoose, { Schema } from 'mongoose'
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
    type: String
  }
}, options)


budgetSchema.post('findOneAndRemove', async budget => {
  if (budget) {
    await Account.remove({budgetID: budget._id})
    await Group.remove({budgetID: budget._id})
    await Payee.remove({budgetID: budget._id})
  } 
});


export default mongoose.model('budget', budgetSchema)