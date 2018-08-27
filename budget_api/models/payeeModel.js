import mongoose, { Schema } from 'mongoose'
import Transaction from './transactionModel'


const options = {
  timestamps: true
}

const payeeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  defaultCategoryID: {
    type: String,
    default: ""
  },
  defaultTransactionType: {
    type: String,
    default: "outflow"
  },
  googlePlace: {
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


payeeSchema.post('remove', async payee => { 
  await Transaction.updateMany({payeeID: payee.id}, {payeeID: ""})
})

export default mongoose.model('payee', payeeSchema)