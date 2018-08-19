import mongoose, { Schema } from 'mongoose'


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
    default: "other" // Choice of ["checking", "savings", "credit", "loan", "mortgage", "investment", "other"]
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
  transactions: [
    { type: Schema.Types.ObjectId, ref: 'Transaction' }
  ]
}, options)


export default mongoose.model('account', accountSchema)