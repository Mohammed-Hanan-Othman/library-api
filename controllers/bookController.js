const db = require("../db/queries");

const getAllBooks = async(req, res,next) =>{
    try {
        const results = await db.getBooksAll();
        if(results){
            res.locals.data = results;
            return next();
        }
        res.status(404).json({"error":"No books found"});
    } catch (error) {
        console.log(error);
        res.status(500).json({"error":"Internal server error"});
    } 
}
const getSingleBook = async(req, res) =>{
    try {
        const {id} = req.params;
        if (id){
            const results = await db.getBooksSingle(id);
            if(results.length >= 1){
                res.status(200).json({"message":"Success","data":results});
                return;
            }
            res.status(404).json({"error":"No book found"});
            return;
        }
        res.status(400).json({"error":"Id not provided, or invalid id"});
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({"error":"Internal server error"});
    }
}
const createBook = async(req, res) =>{
    try {
        const {title, genre_id, author_id, published_date, is_available} = req.body;
        if(title && genre_id && author_id && published_date && is_available){
            const results = await 
                    db.createBook(title,genre_id,author_id,published_date,is_available);
            if(results){
                res.status(201).json({"message":"Book created", "data":results});
                return;
            }
            res.status(500).json({"error":"An error occured while adding book"});
            return;
        }
        res.status(400).json({"error":"Invalid title or published date or availability"});
    } catch (error) {
        console.log(error);
        res.status(500).json({"error":"Internal server error"});
    }
}
const updateBook = async(req, res) =>{
    try {
        const {id} = req.params;
        const {title, genre_id, author_id, published_date, is_available} = req.body;
        if(title && genre_id && author_id &&  published_date && is_available && id){
            const results = await db.getBooksSingle(id);
            if(results.length < 1){
                res.status(404).json({"error":"No existing books found with this id"});
                return;
            }
            const result_ = await db.updateBook(id,title,genre_id,author_id,published_date,is_available);
            if (result_.length > 0){
                res.status(200).json({"message":"Book updated","data":result_});
                return;
            }
            res.status(500).json({"error":"Error occured while updating book"});
            return;
        }
        res.status(400).json({"error":"Invalid title or genre or author or id"});
    } catch (error) {
        console.log(error);
        res.status(500).json({"error":"Internal server error"});
    }
}
const deleteBook = async(req, res) =>{
    try {
        const {id} = req.params;
        if (id){
            const results = await db.getBooksSingle(id);
            if(results.length < 1){
                res.status(404).json({"error":"No existing books found with this id"});
                return;
            }
            const result_ = await db.deleteBook(id);
            if (result_.length > 0){
                res.status(200).json({"message":"Book deleted", "data":result_});
                return;
            }
            res.status(500).json({"error":"Error occured while deleting book"});
            return;
        }
        res.status(400).json({"error":"Invalid id or id not provided"});
    } catch (error) {
        console.log(error);
        res.status(500).json({"error":"Internal server error"});
    }
}

const getBooksByGenre = async(req, res) =>{
    try {
        const {genre} = req.query;
        const results = await db.getBooksByGenreAll();
        if (genre) {
            const results_ = await db.getBooksByGenre(genre);
            res.status(200).json({"message":"Success","data":results_});
            return;
        }
        if(results){
            res.status(200).json({"message":"Success","data":results});
            return;
        }
        res.status(404).json({"error":"No books found"});
    } catch (error) {
        console.log(error);
        res.status(500).json({"error":"Internal server error"});
    } 
}
const getBooksByAuthor = async(req, res) =>{
    try {
        const {author} = req.query;
        const results = await db.getBooksByAuthorAll();
        if (author) {
            const results_ = await db.getBooksByAuthor(author)
            res.status(200).json({"message":"Success","data":results_});
            return;
        }
        if(results){
            res.status(200).json({"message":"Success","data":results});
            return;
        }
        res.status(404).json({"error":"No books found"});
    } catch (error) {
        console.log(error);
        res.status(500).json({"error":"Internal server error"});
    } 
}
const getBooksAvailable = async(req, res) =>{
    try {
        const results = await db.getBooksAvailable();
        if(results){
            res.status(200).json({"message":"Success","data":results});
            return;
        }
        res.status(404).json({"error":"No books found"});
    } catch (error) {
        console.log(error);
        res.status(500).json({"error":"Internal server error"});
    } 
}
const getBooksByTitle = async(req, res) =>{
    try {
        const {title} = req.query;
        if (title){
            const results = await db.getBooksByTitle(title);
            if(results.length >= 1){
                res.status(200).json({"message":"Success","data":results});
                return;
            }
            res.status(404).json({"error":"No book found"});
            return;
        }
        res.status(400).json({"error":"Invalid title or title not provided"});
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({"error":"Internal server error"});
    }
}
const getLatestBooks = async(req, res) =>{
    try {
        const results = await db.getBooksPublishedLatest();
        if(results){
            res.status(200).json({"message":"Success","data":results});
            return;
        }
        res.status(404).json({"error":"No books found"});
    } catch (error) {
        console.log(error);
        res.status(500).json({"error":"Internal server error"});
    } 
}
const getBorrowedStats = async (req, res) =>{
        try {
        const results = await db.getBooksBorrowedStats();
        if(results){
            res.status(200).json({"message":"Success","data":results});
            return;
        }
        res.status(404).json({"error":"No data on books borrowind found"});
    } catch (error) {
        console.log(error);
        res.status(500).json({"error":"Internal server error"});
    } 
}
module.exports = {
    getAllBooks,
    getSingleBook,
    createBook,
    updateBook,
    deleteBook,

    getBooksByGenre,
    getBooksByAuthor,
    getBooksAvailable,
    getBooksByTitle,
    getLatestBooks,
    getBorrowedStats
};