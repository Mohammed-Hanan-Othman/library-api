const {Router} = require("express");
const borrowController = require("../controllers/borrowerController");

const borrowerRouter = Router();
borrowerRouter.get("/",borrowController.getAllBorrowers);
borrowerRouter.get("/:id",borrowController.getSingleBorrower);
borrowerRouter.get("/:id/books-borrowed",borrowController.getBooksBorrowedBy);
borrowerRouter.post("/",borrowController.createBorrower);
borrowerRouter.put("/:id",borrowController.updateBorrower);
borrowerRouter.delete("/:id",borrowController.deleteBorrower);

module.exports = {borrowerRouter};
