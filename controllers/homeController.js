const Book = require('./../models/book')
const Author = require('./../models/author')
const Genre = require('./../models/genre')

exports.index = (req, res, next) => {
	let totalItems
	const perPage = 8
	const page = +req.query.page || 1

	Book.find().countDocuments().then(numberOfBooks => {
		totalItems = numberOfBooks
		return Book.find().populate('author genre').skip((page - 1) * perPage).limit(perPage)
	}).then(list_books => {
		res.render('index', {
			books: list_books,
			title: 'Novel Library',
			currentPage: page,
			hasNextPage: (perPage * page) < totalItems,
			hasPreviousPage: page > 1,
			lastPage: Math.ceil(totalItems / perPage)
		})
	}).catch(err => {
		return next(err)
	})
}

exports.book_search = (req, res, next) => {
	const perPage = 8
	const page = +req.query.page || 1
	let totalItems

	if (req.query.title == '' | req.query.title == undefined) {
		return res.redirect('/')
	}

	const queries = (req.query.sort === undefined) ? '/results?title=' + req.query.title : '/results?title=' + req.query.title + '&sort=' + req.query.sort

	Book.find({ title: new RegExp(req.query.title, 'i') }).sort(req.query.sort).countDocuments().then(numberOfBooks => {
		totalItems = numberOfBooks
		return Book.find({ title: new RegExp(req.query.title, 'i') }).populate('author genre').sort(req.query.sort).skip((page - 1) * perPage).limit(perPage)
	}).then(list_books => {
		res.render('book', {
			books: list_books,
			title: 'Novel Library',
			currentPage: page,
			hasNextPage: (perPage * page) < totalItems,
			hasPreviousPage: page > 1,
			lastPage: Math.ceil(totalItems / perPage),
			totalBooks: totalItems,
			bookTitle: req.query.title,
			queryLink: queries
		})
	}).catch(err => {
		return next(err)
	})
}