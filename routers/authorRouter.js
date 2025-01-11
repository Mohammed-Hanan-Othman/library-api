const {Router} = require("express");
const authorController = require("../controllers/authorController");
const authorRouter = Router();
const {paginate} = require("../middlewares/paginate");

authorRouter.get("/",authorController.getAllAuthors,paginate(),(req,res)=>{
    res.status(200).json({
        message:"Success",
        metadata: res.paginatedResult.metadata,
        data: res.paginatedResult.data
    });
});
authorRouter.get("/most-borrowed",authorController.getAuthorsMostBorrowed);
authorRouter.get("/:id",authorController.getSingleAuthor);
authorRouter.post("/",authorController.createAuthor);
authorRouter.put("/:id",authorController.updateAuthor);
authorRouter.delete("/:id",authorController.deleteAuthor);

module.exports = {authorRouter};
