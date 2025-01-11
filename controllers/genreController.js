const db = require("../db/queries");

const getAllGenres = async(req, res) =>{
    try {
        const results = await db.getGenresAll();
        if(results){
            res.status(200).json({"message":"Success","data":results});
            return;
        }
        res.status(404).json({"error":"No genres found"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({"error":"Internal server error"});
    } 
}

const getSingleGenre = async(req, res) =>{
    try {
        const {id} = req.params;
        if (id){
            const results = await db.getGenresSingle(id);
            if(results.length >= 1){
                res.status(200).json({"message":"Success","data":results});
                return;
            }
            res.status(404).json({"error":"No genres found"});
            return;
        }
        res.status(400).json({"error":"Id not provided, or invalid id"});
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({"error":"Internal server error"});
    }
}

const createGenre = async(req, res) =>{
    try {
        const {name,description} = req.body;
        if(name && description){
            const results = await db.createGenre(name,description);
            if(results){
                res.status(200).json({"message":"Genre created", "data":results});
                return;
            }
            res.status(500).json({"error":"An error occured while creating genre"});
            return;
        }
        res.status(400).json({"error":"Invalid name or description"});
    } catch (error) {
        console.log(error);
        res.status(500).json({"error":"Internal server error"});
    }
}

const updateGenre = async(req, res) =>{
    try {
        const {id} = req.params;
        const {name, description} = req.body;
        if(name && description && id){
            const results = await db.getGenresSingle(id);
            if(results.length < 1){
                res.status(404).json({"error":"No existing genres found with this id"});
                return;
            }
            const result_ = await db.updateGenre(id,name,description);
            if (result_.length > 0){
                res.status(200).json({"message":"Genre updated","data":result_});
                return;
            }
            res.status(500).json({"error":"Error occured while updating genre"});
            return;
        }
        res.status(400).json({"error":"Invalid name or description or id"});
    } catch (error) {
        console.log(error);
        res.status(500).json({"error":"Internal server error"});
    }
}

const deleteGenre = async(req, res) =>{
    try {
        const {id} = req.params;
        if (id){
            const results = await db.getGenresSingle(id);
            if(results.length < 1){
                res.status(404).json({"error":"No existing genres found with this id"});
                return;
            }
            const result_ = await db.deleteGenre(id);
            if (result_.length > 0){
                res.status(200).json({"message":"Genre deleted", "data":result_});
                return;
            }
            res.status(500).json({"error":"Error occured while deleting genre"});
            return;
        }
        res.status(400).json({"error":"Invalid id or id not provided"});
    } catch (error) {
        console.log(error);
        res.status(500).json({"error":"Internal server error"});
    }
}

const getPopularGenres = async (req,res) => {
    try {
        const results = await db.getPopularGenres();
        if(results){
            res.status(200).json({"message":"Success","data":results});
            return;
        }
        res.status(404).json({"error":"No genres found"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({"error":"Internal server error"});
    }
}

module.exports = {
    getAllGenres,
    getSingleGenre,
    createGenre,
    updateGenre,
    deleteGenre,

    getPopularGenres
};