import mongoose, { Schema } from 'mongoose'
import Budget from './budgetModel'
import Category from './categoryModel'
import Payee from './payeeModel'
import Transaction from './transactionModel'


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
  let categoryIDs = await Category.find({groupID: group.id}, '_id')
  categoryIDs = categoryIDs.map(item=>item._id)
  await Payee.updateMany({defaultCategoryID: {$in: categoryIDs}}, {defaultCategoryID: ""})
  await Transaction.updateMany({categoryID: {$in: categoryIDs}}, {categoryID: ""})
  await Category.remove({groupID: group.id})
})


export default mongoose.model('group', groupSchema)