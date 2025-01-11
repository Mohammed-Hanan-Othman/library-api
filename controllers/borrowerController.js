const db = require("../db/queries");

const getAllBorrowers = async(req, res) =>{
    try {
        const results = await db.getBorrowersAll();
        if(results){
            res.status(200).json({"message":"Success","data":results});
            return;
        }
        res.status(404).json({"error":"No borrowers found"});
    } catch (error) {
        console.log(error);
        res.status(500).json({"error":"Internal server error"});
    } 
}

const getSingleBorrower = async(req, res) =>{
    try {
        const {id} = req.params;
        if (id){
            const results = await db.getBorrowersSingle(id);
            if(results.length >= 1){
                res.status(200).json({"message":"Success","data":results});
                return;
            }
            res.status(404).json({"error":"No borrower found"});
            return;
        }
        res.status(400).json({"error":"Id not provided, or invalid id"});
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({"error":"Internal server error"});
    }
}

const createBorrower = async(req, res) =>{
    try {
        const {name, email} = req.body;
        if(name && email ){
            const results = await db.createBorrower(name,email);
            if(results){
                res.status(201).json({"message":"Borrower created", "data":results});
                return;
            }
            res.status(500).json({"error":"An error occured while adding borrower"});
            return;
        }
        res.status(400).json({"error":"Invalid name or email"});
    } catch (error) {
        console.log(error);
        res.status(500).json({"error":"Internal server error"});
    }
}

const updateBorrower = async(req, res) =>{
    try {
        const {id} = req.params;
        const {name, email} = req.body;
        if(name && email && id){
            const results = await db.getBorrowersSingle(id);
            if(results.length < 1){
                res.status(404).json({"error":"No existing borrowers found with this id"});
                return;
            }
            const result_ = await db.updateBorrower(id,name,email);
            if (result_.length > 0){
                res.status(200).json({"message":"Borrower updated","data":result_});
                return;
            }
            res.status(500).json({"error":"Error occured while updating borrower"});
            return;
        }
        res.status(400).json({"error":"Invalid name or email or id"});
    } catch (error) {
        console.log(error);
        res.status(500).json({"error":"Internal server error"});
    }
}

const deleteBorrower = async(req, res) =>{
    try {
        const {id} = req.params;
        if (id){
            const results = await db.getBorrowersSingle(id);
            if(results.length < 1){
                res.status(404).json({"error":"No existing borrowers found with this id"});
                return;
            }
            const result_ = await db.deleteBorrower(id);
            if (result_.length > 0){
                res.status(200).json({"message":"Borrower deleted", "data":result_});
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

const getBooksBorrowedBy = async(req, res) =>{
    try {
        // get id of borrower
        const {id} = req.params;
        if (id){
            // check if a borrower with the id exist
            const result = await db.getBorrowersSingle(id);
            if(result.length == 0){
                // if the borrower does not exit send an error
                res.send(404).json({"error":"No borrower found with given id"});
                return;
            }

            const result_ = await db.getBooksBorrowedBy(id);
            res.status(200).json({"message":"Success","data":result_});
            return;
        }
        res.status(400).json({"error":"Id not provided, or invalid id"});
    } catch (error) {
        console.log(error);
        res.status(500).json({"error":"Internal server error"});
    }
}

module.exports = {
    getAllBorrowers,
    getSingleBorrower,
    createBorrower,
    updateBorrower,
    deleteBorrower,

    getBooksBorrowedBy
};