import mongoose, { Schema } from 'mongoose'


const options = {
  timestamps: true
}

const groupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  Categories: [
    { type: Schema.Types.ObjectId, ref: 'Category' }
  ],
  visible: {
    type: Boolean,
    default: true
  }
}, options)


export default mongoose.model('group', groupSchema)