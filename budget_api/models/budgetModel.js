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
  payess: [
    { type: Schema.Types.ObjectId, ref: 'Payee' }
  ],
  acounts: [
    { type: Schema.Types.ObjectId, ref: 'Account' }
  ],
  groups: [
    { type: Schema.Types.ObjectId, ref: 'Group' }
  ]
}, options)



export default mongoose.model('budget', budgetSchema)