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
    { type: Schema.Types.ObjectId, ref: 'Payee' }
  ],
  acountIDs: [
    { type: Schema.Types.ObjectId, ref: 'Account' }
  ],
  groupIDs: [
    { type: Schema.Types.ObjectId, ref: 'Group' }
  ]
}, options)



export default mongoose.model('budget', budgetSchema)