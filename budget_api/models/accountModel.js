import mongoose, { Schema } from 'mongoose'
import Budget from './budgetModel'


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
    type: Map,
    default: {}
  },
  budgetID: {
    type: String,
    required: true
  },
  transactionIDs: [
    { type: String }
  ]
}, options)


accountSchema.post('findOneAndRemove', async account => { 
  if (account) {
    const budget = await Budget.findById(account.budgetID)
    await budget.update({accountIDs: budget.accountIDs.filter(accountID=>accountID!==account.id)})
  } 
});


export default mongoose.model('account', accountSchema)