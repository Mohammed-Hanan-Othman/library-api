const {Router} = require("express");
const bRecordsController = require("../controllers/bRecordsController");
const {paginate} = require("../middlewares/paginate");


const bRecordsRouter = Router();
bRecordsRouter.get("/",bRecordsController.getAllBRecords);
bRecordsRouter.get("/due-soon",bRecordsController.getBooksDueSoon);
bRecordsRouter.get("/overdue",bRecordsController.getBooksOverdue);
bRecordsRouter.get("/history",
    bRecordsController.getBorrowingHistory,paginate(), (req,res) =>{
        res.status(200).json({
        message:"Success",
        metadata: res.paginatedResult.metadata,
        data: res.paginatedResult.data
    });
    });
bRecordsRouter.get("/:id",bRecordsController.getSingleBRecord);
bRecordsRouter.post("/",bRecordsController.createBRecord);
bRecordsRouter.put("/:id",bRecordsController.updateBRecord);
bRecordsRouter.delete("/:id",bRecordsController.deleteBRecord);

module.exports = {bRecordsRouter};
