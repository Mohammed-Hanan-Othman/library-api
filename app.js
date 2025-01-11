require("dotenv").config();
const express = require("express");
const {indexRouter} = require("./routers/indexRouter");
const {authorRouter} = require("./routers/authorRouter");
const {bookRouter} = require("./routers/bookRouter");
const {genreRouter} = require("./routers/genreRouter");
const {borrowerRouter} = require("./routers/borrowerRouter");
const {bRecordsRouter} = require("./routers/bRecordsRouter");

const app = express();
app.use(express.urlencoded({ extended: false }));


app.use("/", indexRouter);
app.use("/genres",genreRouter);
app.use("/authors",authorRouter);
app.use("/books",bookRouter);
app.use("/borrowers",borrowerRouter);
app.use("/brecords",bRecordsRouter);

// handle Bad requests
app.use((req, res)=>{
    res.status(400).json({"error":"Bad request"});
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Express app running on ${PORT}`));