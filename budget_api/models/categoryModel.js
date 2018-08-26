import mongoose, { Schema } from 'mongoose'
import Group from './groupModel'


const options = {
  timestamps: true
}

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  budgeted: [
    {type: Object}  // [ {date: 2018-05-01, amount: 1264.45} ]
  ],
  visible: {
    type: Boolean,
    default: true
  },
  groupID: {
    type: String,
    required: true
  },
  userID: {
    type: String,
    required: true
  }
}, options)


categorySchema.post('remove', async category => { 
  await Group.findByIdAndUpdate(category.groupID, { $pull: { categoryIDs: category.id } }) 
})


export default mongoose.model('category', categorySchema)