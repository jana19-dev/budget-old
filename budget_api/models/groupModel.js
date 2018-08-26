import mongoose, { Schema } from 'mongoose'
import Budget from './budgetModel'


const options = {
  timestamps: true
}

const groupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  visible: {
    type: Boolean,
    default: true
  },
  categoryIDs: [
    { type: String }
  ],
  budgetID: {
    type: String,
    required: true
  },
  userID: {
    type: String,
    required: true
  }
}, options)


groupSchema.post('remove', async group => { 
  await Budget.findByIdAndUpdate(group.budgetID, { $pull: { groupIDs: group.id } }) 
})


export default mongoose.model('group', groupSchema)