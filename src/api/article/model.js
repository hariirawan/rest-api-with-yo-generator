import mongoose, { Schema } from 'mongoose';

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    authorID: {
      type: Schema.Types.ObjectId,
      required: true
    },
    categoryID: {
      type: Schema.Types.ObjectId,
      required: true
    },
    slug: {
      type: String
    },
    picture: {
      type: String
    },
    excerpt: {
      type: String
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id;
      }
    }
  }
);

articleSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      title: this.title,
      content: this.content,
      authorID: this.authorID,
      categoryID: this.categoryID,
      picture: this.picture,
      slug: this.slug,
      excerpt: this.excerpt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };

    return full
      ? {
          ...view
          // add properties for a full view
        }
      : view;
  }
};

const model = mongoose.model('Article', articleSchema);

export const schema = model.schema;
export default model;
