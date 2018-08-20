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
    type: Schema.Types.ObjectId, 
    ref: 'Payee'
  },
  accountID: {
    type: Schema.Types.ObjectId, 
    ref: 'Account'
  },
  categoryID: {
    type: Schema.Types.ObjectId, 
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
  plaidTransaction: {
    type: Map,
    default: {}
  }
}, options)


export default mongoose.model('transaction', transactionSchema)