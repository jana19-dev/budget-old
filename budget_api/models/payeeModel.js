import mongoose, { Schema } from 'mongoose'


const options = {
  timestamps: true
}

const payeeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  defaultCategoryID: {
    type: String,
    default: ""
  },
  defaultTransactionType: {
    type: String,
    default: "outflow"
  },
  googlePlace: {
    type: Object
  },
  budgetID: {
    type: String,
    required: true
  },
  userID: {
    type: String,
    required: true
  }
}, options)



export default mongoose.model('payee', payeeSchema)