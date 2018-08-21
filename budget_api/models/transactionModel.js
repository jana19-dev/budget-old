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
    required: true
  },
  accountID: {
    type: String,
    required: true
  },
  categoryID: {
    type: String,
    required: true
  },
  recurring: {
    type: mixed,
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
    type: mixed,
    default: {}
  }
}, options)


export default mongoose.model('transaction', transactionSchema)