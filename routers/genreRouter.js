const {Router} = require("express");
const genreController = require("../controllers/genreController");

const genreRouter = Router();
genreRouter.get("/",genreController.getAllGenres);
genreRouter.get("/popular",genreController.getPopularGenres);
genreRouter.get("/:id",genreController.getSingleGenre);
genreRouter.post("/",genreController.createGenre);
genreRouter.put("/:id",genreController.updateGenre);
genreRouter.delete("/:id",genreController.deleteGenre);

module.exports = {genreRouter};
