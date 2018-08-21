import mongoose, { Schema } from 'mongoose'


const options = {
  timestamps: true
}

const groupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  CategoryIDs: [
    { type: String }
  ],
  visible: {
    type: Boolean,
    default: true
  }
}, options)


export default mongoose.model('group', groupSchema)