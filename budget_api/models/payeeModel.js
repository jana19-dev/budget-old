import mongoose, { Schema } from 'mongoose'


const options = {
  timestamps: true
}

const payeeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  autoCategoryID: {
    type: String,
    default: ""
  },
  autoTransactionType: {
    type: String,
    default: "outflow"
  },
  googlePlace: {
    type: mixed,
    default: {}
  }
}, options)


export default mongoose.model('payee', payeeSchema)