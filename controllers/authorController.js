const db = require("../db/queries");
const getAllAuthors = async(req, res, next) =>{
    try {
        const results = await db.getAuthorsAll();
        if(results){
            res.locals.data = results
            return next();
        }
        res.status(404).json({"error":"No authors found"});
    } catch (error) {
        console.log(error);
        res.status(500).json({"error":"Internal server error"});
    } 
}
const getSingleAuthor = async(req, res) =>{
    try {
        const {id} = req.params;
        if (id){
            const results = await db.getAuthorsSingle(id);
            if(results.length >= 1){
                console.log(results);
                res.status(200).json({"message":"Success","data":results});
                return;
            }
            res.status(404).json({"error":"No authors found"});
            return;
        }
        res.status(400).json({"error":"Id not provided, or invalid id"});
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({"error":"Internal server error"});
    }
}
const createAuthor = async(req, res) =>{
    try {
        const {name,bio,dateOfBirth} = req.body;
        if(name && bio && dateOfBirth){
            const results = await db.createAuthor(name,bio,dateOfBirth);
            if(results){
                res.status(201).json({"message":"Author created", "data":results});
                return;
            }
            res.status(500).json({"error":"An error occured while creating author"});
            return;
        }
        res.status(400).json({"error":"Invalid name or bio or date of birth"});
    } catch (error) {
        console.log(error);
        res.status(500).json({"error":"Internal server error"});
    }
}
const updateAuthor = async(req, res) =>{
    try {
        const {id} = req.params;
        const {name, bio, dateOfBirth} = req.body;
        if(name && bio && dateOfBirth && id){
            const results = await db.getAuthorsSingle(id);
            if(results.length < 1){
                res.status(404).json({"error":"No existing authors found with this id"});
                return;
            }
            const result_ = await db.updateAuthor(id,name,bio,dateOfBirth);
            if (result_.length > 0){
                res.status(200).json({"message":"Author updated","data":result_});
                return;
            }
            res.status(500).json({"error":"Error occured while updating author"});
            return;
        }
        res.status(400).json({"error":"Invalid name or bio or date of birth or id"});
    } catch (error) {
        console.log(error);
        res.status(500).json({"error":"Internal server error"});
    }
}
const deleteAuthor = async(req, res) =>{
    try {
        const {id} = req.params;
        if (id){
            const results = await db.getAuthorsSingle(id);
            if(results.length < 1){
                res.status(404).json({"error":"No existing authors found with this id"});
                return;
            }
            const result_ = await db.deleteAuthor(id);
            if (result_.length > 0){
                res.status(200).json({"message":"Author deleted", "data":result_});
                return;
            }
            res.status(500).json({"error":"Error occured while deleting author"});
            return;
        }
        res.status(400).json({"error":"Invalid id or id not provided"});
    } catch (error) {
        console.log(error);
        res.status(500).json({"error":"Internal server error"});
    }
}
const getAuthorsMostBorrowed = async(req, res) =>{
    try {
        const results = await db.getAuthorsMostBorrowed();
        if(results){
            res.status(200).json({"message":"Success","data":results});
            return;
        }
        res.status(404).json({"error":"No authors borrowed data found"});
    } catch (error) {
        console.log(error);
        res.status(500).json({"error":"Internal server error"});
    } 
}

module.exports = {
    getAllAuthors,
    getSingleAuthor,
    createAuthor,
    updateAuthor,
    deleteAuthor,

    getAuthorsMostBorrowed
};