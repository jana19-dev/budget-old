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
  payeeID: {
    type: String, 
    ref: 'Payee'
  },
  accountID: {
    type: String, 
    ref: 'Account'
  },
  categoryID: {
    type: String, 
    ref: 'Category'
  },
  recurring: {
    type: Map,
    default: {frequency: "once", untilDate: null, noOfPayments: 1}
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
    type: Map,
    default: {}
  }
}, options)


export default mongoose.model('transaction', transactionSchema)