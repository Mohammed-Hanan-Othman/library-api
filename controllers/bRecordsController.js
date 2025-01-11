const db = require("../db/queries")

const getAllBRecords = async(req, res) =>{
    try {
        const results = await db.getBRecordsAll();
        if(results){
            res.status(200).json({"message":"Success","data":results});
            return;
        }
        res.status(404).json({"error":"No borrowing records found"});
    } catch (error) {
        console.log(error);
        res.status(500).json({"error":"Internal server error"});
    }
}

const getSingleBRecord = async(req, res) =>{
    try {
        const {id} = req.params;
        if (id){
            const results = await db.getBRecordsSingle(id);
            if(results.length >= 1){
                res.status(200).json({"message":"Success","data":results});
                return;
            }
            res.status(404).json({"error":"No borrowing record found"});
            return;
        }
        res.status(400).json({"error":"Id not provided, or invalid id"});
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({"error":"Internal server error"});
    }
}

const createBRecord = async(req, res) =>{
    try {
        const {bookId, borrowerId, borrowedDate, dueDate} = req.body;
        if(bookId && borrowerId && borrowedDate && dueDate){
            const results = await db.createBRecord(bookId,borrowerId,
                borrowedDate,dueDate);
            if(results){
                res.status(201)
                    .json({"message":"Borrowing successful", "data":results});
                return;
            }
            res.status(500)
                .json({"error":"An error occured while creating borrower record"});
            return;
        }
        res.status(400)
            .json({"error":"Book id or borrower id or dates invalid or not provided"});
    } catch (error) {
        console.log(error);
        res.status(500).json({"error":"Internal server error"});
    }
}

const updateBRecord = async(req, res) =>{
    try {
        const {id} = req.params;
        const {bookId, borrowerId,borrowedDate, 
            dueDate, returnedDate} = req.body;
        if(id && bookId && borrowerId && borrowedDate && dueDate &&returnedDate){
            const results = await db.getBRecordsSingle(id);
            if(results.length < 1){
                res.status(404).json({"error":"No borrowing records found with this id"});
                return;
            }
            const result_ = await  
                db.updateBRecord(id, bookId, borrowerId, borrowedDate, dueDate,
                    returnedDate);
            if (result_.length > 0){
                res.status(200).json({"message":"Borrowing record updated","data":result_});
                return;
            }
            res.status(500).json({"error":"Error occured while updating borrowing record"});
            return;
        }
        res.status(400).json({"error":"Invalid book or borrower id or invalid dates"});
    } catch (error) {
        console.log(error);
        res.status(500).json({"error":"Internal server error"});
    }
}

const deleteBRecord = async(req, res) =>{
        try {
        const {id} = req.params;
        if (id){
            const results = await db.getBRecordsSingle(id);
            if(results.length < 1){
                res.status(404).json({"error":"No existing borrowing records found with this id"});
                return;
            }
            const result_ = await db.deleteBRecord(id);
            if (result_.length > 0){
                res.status(200).json({"message":"Borrowing record deleted", "data":result_});
                return;
            }
            res.status(500).json({"error":"Error occured while deleting borrowing record"});
            return;
        }
        res.status(400).json({"error":"Invalid id or id not provided"});
    } catch (error) {
        console.log(error);
        res.status(500).json({"error":"Internal server error"});
    }
}


const getBooksDueSoon = async(req, res) =>{
    try {
        const results = await db.getBooksDueSoon();
        if(results){
            res.status(200).json({"message":"Success","data":results});
            return;
        }
        res.status(404).json({"error":"No borrowing records found"});
    } catch (error) {
        console.log(error);
        res.status(500).json({"error":"Internal server error"});
    }
}
const getBooksOverdue = async(req, res) =>{
    try {
        const results = await db.getBooksOverdue();
        if(results){
            res.status(200).json({"message":"Success","data":results});
            return;
        }
        res.status(404).json({"error":"No borrowing records found"});
    } catch (error) {
        console.log(error);
        res.status(500).json({"error":"Internal server error"});
    }
}
const getBorrowingHistory = async (req, res, next) =>{
    try {
        const results = await db.getBorrowingHistory();
        if(results){
            res.locals.data = results;
            return next();
        }
        res.status(404).json({"error":"No borrowing records found"});
    } catch (error) {
        console.log(error);
        res.status(500).json({"error":"Internal server error"});
    }
}
module.exports = {
    getAllBRecords,
    getSingleBRecord,
    createBRecord,
    updateBRecord,
    deleteBRecord,

    getBooksDueSoon,
    getBooksOverdue,
    getBorrowingHistory
};