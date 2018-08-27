import mongoose, { Schema } from 'mongoose'
import Group from './groupModel'
import Payee from './payeeModel'
import Transaction from './transactionModel'


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
  groupID: {
    type: String,
    required: true
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


categorySchema.post('remove', async category => { 
  await Group.findByIdAndUpdate(category.groupID, { $pull: { categoryIDs: category.id } }) 
  await Payee.updateMany({defaultCategoryID: category.id}, {defaultCategoryID: ""})
  await Transaction.updateMany({categoryID: category.id}, {categoryID: ""})
})


export default mongoose.model('category', categorySchema)