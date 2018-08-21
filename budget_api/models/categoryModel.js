import mongoose, { Schema } from 'mongoose'


const options = {
  timestamps: true
}

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  budget: {
    type: [mixed],  // {date: 2018-05-01, amount: 1264.45}
    defautl: []
  },
  visible: {
    type: Boolean,
    default: true
  }
}, options)


export default mongoose.model('category', categorySchema)