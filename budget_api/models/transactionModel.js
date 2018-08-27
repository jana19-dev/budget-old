import mongoose, { Schema } from 'mongoose'


const options = {
  timestamps: true
}

const transactionSchema = new Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  recurring: {
    type: Object,
    default: {frequency: "once", startDate: "", untilDate: "", noOfPayments: 1}
  },
  inflow: {
    type: Number,
    default: 0
  },
  outflow: {
    type: Number,
    default: 0
  },
  cleared: {
    type: Boolean,
    default: false
  },
  tag: {
    type: String,
    default: ""
  },
  memo: {
    type: String,
    default: ""
  },
  attachment: {
    type: String,
    default: ""
  },
  plaidTransaction: {
    type: Object
  },
  payeeID: {
    type: String,
    default: ""
  },
  accountID: {
    type: String,
    default: ""
  },
  categoryID: {
    type: String,
    default: ""
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


export default mongoose.model('transaction', transactionSchema)