const mongoose = require("mongoose")
const Schema = mongoose.Schema

const BookSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: "Author",
		required: true,
	},
	summary: {
		type: String,
		required: true,
	},
	isbn: {
		type: String,
		required: true,
	},
	genre: [
		{
			type: Schema.Types.ObjectId,
			ref: "Genre",
		},
	],
	ratings: {
		type: Number,
		required: true,
	},
	photo: {
		type: String
	},
})

//Export model
module.exports = mongoose.model("Book", BookSchema)
