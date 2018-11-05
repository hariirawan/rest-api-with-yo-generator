import mongoose, { Schema } from 'mongoose'

const authorSchema = new Schema({
  userID: {
    type: String
  },
  address: {
    type: String
  },
  picture: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

authorSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      userID: this.userID,
      address: this.address,
      picture: this.picture,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Author', authorSchema)

export const schema = model.schema
export default model
