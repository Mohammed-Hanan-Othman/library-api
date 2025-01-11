const {Router} = require("express");
const bookController = require("../controllers/bookController");
const {paginate} = require("../middlewares/paginate");

const bookRouter = Router();
bookRouter.get("/",bookController.getAllBooks, paginate(),(req,res) =>{
    res.status(200).json({
        message:"Success",
        metadata: res.paginatedResult.metadata,
        data: res.paginatedResult.data
    });
});

bookRouter.get("/genres",bookController.getBooksByGenre);
bookRouter.get("/available",bookController.getBooksAvailable);
bookRouter.get("/authors",bookController.getBooksByAuthor);
bookRouter.get("/by-title",bookController.getBooksByTitle);
bookRouter.get("/latest",bookController.getLatestBooks);
bookRouter.get("/borrowed-stats",bookController.getBorrowedStats);
bookRouter.get("/:id",bookController.getSingleBook);
bookRouter.post("/",bookController.createBook);
bookRouter.put("/:id",bookController.updateBook);
bookRouter.delete("/:id",bookController.deleteBook);

module.exports = {bookRouter};
