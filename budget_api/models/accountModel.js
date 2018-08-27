import mongoose, { Schema } from 'mongoose'
import Budget from './budgetModel'
import Transaction from './transactionModel'


const options = {
  timestamps: true
}

const accountSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  type: {
    type: String,
    default: "other" // Choice of ["checking", "savings", "credit", "loan", "mortgage", "investment", "cash", "other"]
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  startBalance: {
    type: Number,
    required: true,
    default: 0
  },
  budgeted: {
    type: Boolean,
    default: true
  },
  plaidAccount: {
    type: Object
  },
  budgetID: {
    type: String,
    required: true
  },
  userID: {
    type: String,
    required: true
  }
}, options)


accountSchema.post('remove', async account => { 
  await Budget.findByIdAndUpdate(account.budgetID, { $pull: { accountIDs: account.id } }) 
  await Transaction.updateMany({accountID: account.id}, {accountID: ""})
})


export default mongoose.model('account', accountSchema)