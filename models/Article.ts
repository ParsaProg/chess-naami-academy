import mongoose from 'mongoose'

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    cats: {type: Array, required: true},
    titleImage: {type:File, required: true},
    views: {type:String, required: true},
    likes: {type:String, required: true},
    importantText: {type:String, required: true},
    desc: {type:String, required: true},
    time: {type:String, required: true},
    publishDate: {type:String, required: true},
    publisherName: {type:File, required: true},
    publisherImage: {type:String, required: true},
    publisherTag: {type:String, required: true},
    comments: {type:String, required: true},
    isSpecial: {type: Boolean, required: true},
  },
  { timestamps: true }
)

export default mongoose.models.Article || mongoose.model('Article', ArticleSchema)
