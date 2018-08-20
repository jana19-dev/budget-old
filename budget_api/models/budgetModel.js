import mongoose, { Schema } from 'mongoose'


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
    { type: String, ref: 'Payee' }
  ],
  accountIDs: [
    { type: String, ref: 'Account' }
  ],
  groupIDs: [
    { type: String, ref: 'Group' }
  ]
}, options)



export default mongoose.model('budget', budgetSchema)