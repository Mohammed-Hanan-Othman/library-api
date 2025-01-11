const {pool} = require("./pool");

/* GENRE CRUD */
//  List all genres.
const getGenresAll = async () => {
    const query = `SELECT * FROM genres`;
    const result = await pool.query(query);
    return result.rows
}
//  Get genre details by id.
const getGenresSingle = async (id) => {
    const query = `SELECT * FROM genres where id=$1`;
    const values = [id];
    const result = await pool.query(query,values);
    return result.rows
}
//  Add a new genre.
const createGenre = async (name, description) => {
    const query = `INSERT INTO genres(name,description) VALUES($1, $2) RETURNING *;`;
    const values = [name, description];
    const result = await pool.query(query, values);
    return result.rows;
}
//  Update a genre by id.
const updateGenre = async (id,name, description) =>{
    const query = `UPDATE genres SET name=$1,description=$2 WHERE id=$3 RETURNING *;`;
    const values = [name, description, id];
    const result = await pool.query(query, values);
    return result.rows;
}
//  Delete a genre by id.
const deleteGenre = async (id) =>{
    const query = `DELETE FROM genres WHERE id=$1 RETURNING *`;
    const values = [id];
    const result = await pool.query(query,values);
    return result.rows;
}

/* AUTHOR CRUD */
// List all authors
const getAuthorsAll = async () =>{
    const query = `
        SELECT * FROM authors
        ORDER BY name;
    `;
    const result = await pool.query(query);
    return result.rows
}
// Get author details by id
const getAuthorsSingle = async (id) => {
    const query = `SELECT * FROM authors where id=$1;`;
    const values = [id];
    const result = await pool.query(query,values);
    return result.rows
}
// Add a new author
const createAuthor = async (name, bio, dateOfBirth) => {
    const query = `INSERT INTO authors(name,bio,date_of_birth) VALUES($1,$2,$3) RETURNING *;`;
    const values = [name, bio, dateOfBirth];
    const result = await pool.query(query, values);
    return result.rows;
}
// Update an author by id
const updateAuthor = async (id, name, bio, dateOfBirth) =>{
    const query = `UPDATE authors SET name=$1, bio=$2, date_of_birth=$3 WHERE id=$4 RETURNING *;`;
    const values = [name, bio, dateOfBirth, id];
    const result = await pool.query(query, values);
    return result.rows;
}
// Delete an author by id
const deleteAuthor = async (id) =>{
    const query = `DELETE FROM authors WHERE id=$1 RETURNING *;`;
    const values = [id];
    const result = await pool.query(query,values);
    return result.rows;
}


/** BOOKS CRUD */ 
// current stage
// List all books
const getBooksAll = async () =>{
    const query = `
        SELECT * FROM books
        ORDER BY is_available DESC;
    `;
    const result = await pool.query(query);
    return result.rows
}
// Get book details by id
const getBooksSingle = async (id) => {
    const query = `SELECT * FROM books where id=$1;`;
    const values = [id];
    const result = await pool.query(query,values);
    return result.rows
}
// Add a new book
const createBook = async (title, genre_id, author_id, published_date, is_available) => {
    const query = `
        INSERT INTO books(title, genre_id, author_id, published_date, is_available)
        VALUES($1,$2,$3,$4,$5) 
        RETURNING *;
    `;
    const values = [title, genre_id, author_id, published_date, is_available];
    const result = await pool.query(query, values);
    return result.rows;
}
//Update book by id
const updateBook = async (id,title, genre_id, author_id, published_date, is_available) =>{
    const query = `
        UPDATE books SET title=$1, genre_id=$2, author_id=$3,published_date=$4, is_available=$5
        WHERE id=$6
        RETURNING *;
    `;
    const values = [title, genre_id, author_id, published_date, is_available, id];
    const result = await pool.query(query, values);
    return result.rows;
}
//Delete a book by id
const deleteBook = async (id) =>{
    const query = `DELETE FROM books WHERE id=$1 RETURNING *;`;
    const values = [id];
    const result = await pool.query(query,values);
    return result.rows;
}


/** BORROWERS CRUD */
// List all borrowers
const getBorrowersAll = async () =>{
    const query = `
        SELECT * FROM borrowers;
    `;
    const result = await pool.query(query);
    return result.rows
}
// Get specific borrower details by id
const getBorrowersSingle = async (id) => {
    const query = `
        SELECT * FROM borrowers 
        where id=$1;
    `;
    const values = [id];
    const result = await pool.query(query,values);
    return result.rows
}
// Add a new borrower.
const createBorrower = async (name, email) => {
    const query = `
        INSERT INTO borrowers(name,email) 
            VALUES($1,$2) 
        RETURNING *;
        `;
    const values = [name, email];
    const result = await pool.query(query, values);
    return result.rows;
}
// Update borrower by id.
const updateBorrower = async (id, name, email) =>{
    const query = `
        UPDATE borrowers SET name=$1, email=$2
            WHERE id=$3 
        RETURNING *;
        `;
    const values = [name, email, id];
    const result = await pool.query(query, values);
    return result.rows;
}
// Delete borrower by id
const deleteBorrower = async (id) =>{
    const query = `
        DELETE FROM borrowers 
        WHERE id=$1 
        RETURNING *;
    `;
    const values = [id];
    const result = await pool.query(query,values);
    return result.rows;
}

/** BORROWING RECORDS CRUD */
// List all borrowing records
const getBRecordsAll = async () =>{
    const query = `
        SELECT * FROM borrowing_records;
    `;
    const result = await pool.query(query);
    return result.rows
}
//Get a single borrowing record by id
const getBRecordsSingle = async (id) => {
    const query = `
        SELECT * FROM borrowing_records 
        WHERE id=$1;
    `;
    const values = [id];
    const result = await pool.query(query,values);
    return result.rows
}
// Add a new borrowing record
const createBRecord = async (bookId, borrowerId, 
    borrowedDate, dueDate) =>{
    const query = `
        INSERT INTO borrowing_records(book_id, borrower_id, 
    borrowed_date, due_date, returned_date)
        VALUES ($1,$2,$3,$4,NULL)
        RETURNING * ;
    `;
    const query_ = `
        UPDATE books SET
            is_available = FALSE
        WHERE id = $1;
    `;
    const values_ = [bookId];
    const values = [bookId, borrowerId, borrowedDate, dueDate];
    const result = await pool.query(query,values);
    const result_ = await pool.query(query_,values_);
    return result.rows;
}
// Update a borrowing record
const updateBRecord = async (id, bookId, borrowerId,
    borrowedDate, dueDate, returnedDate )=>{
    const query = `
        UPDATE borrowing_records SET
            book_id=$1, borrower_id=$2, borrowed_date=$3, 
            due_date=$4, returned_date=$5
            WHERE id=$6
        RETURNING * ;
    `;
    const values = [bookId, borrowerId, borrowedDate, 
        dueDate, returnedDate,id];
    const query_ = `
        UPDATE books SET
            is_available = TRUE
        WHERE id = $1;
    `;
    const values_ = [bookId];
    const result = await pool.query(query,values);
    const result_ = await pool.query(query_,values_);
    return result.rows;
}
// Delete a borrowing record
const deleteBRecord = async (id) =>{
    const query = `
        DELETE FROM borrowing_records 
        WHERE id=$1 
        RETURNING *;
    `;
    const values = [id];
    const result = await pool.query(query,values);
    return result.rows;
}

/** Queries for advanced functionality */ 
const getBooksByGenreAll = async () =>{
    const query = `
        SELECT b.id,b.title, g.name as genre, b.published_date,b.is_available
        FROM books as b 
        INNER JOIN genres as g
        ON b.genre_id = g.id
        ORDER BY g.name,b.is_available desc,b.published_date DESC;
    `;
    const result = await pool.query(query);
    return result.rows;
}
const getBooksByGenre = async (genre) =>{
    const query = `
        SELECT b.id,b.title, g.name as genre, b.published_date,b.is_available
        FROM books as b 
        INNER JOIN genres as g
        ON b.genre_id = g.id
        WHERE LOWER(g.name) LIKE $1
        ORDER BY g.name,b.is_available desc,b.published_date DESC;
    `;
    const genreString = '%'+genre.toLowerCase()+'%';
    const values = [genreString];
    const result = await pool.query(query,values);
    return result.rows;
}
const getBooksByAuthorAll = async () =>{
    const query = `
        SELECT b.id,b.title,
        a.name as author,
        g.name as genre,
        b.published_date,b.is_available
        FROM books as b
        INNER JOIN authors as a
        ON b.author_id = a.id
        INNER JOIN genres as g
        ON g.id = b.genre_id
        ORDER BY a.name,b.published_date DESC, b.is_available DESC;
    `;
    const result = await pool.query(query);
    return result.rows;
}
const getBooksByAuthor = async (author) =>{
    const query = `
        SELECT b.id,b.title,
            a.name as author,
            g.name as genre,
            b.published_date,
            b.is_available
        FROM books as b
        INNER JOIN authors as a
        ON b.author_id = a.id
        INNER JOIN genres as g
        ON g.id = b.genre_id
        WHERE LOWER(a.name) LIKE $1
        ORDER BY g.name, b.published_date DESC, b.is_available DESC;
    `;
    const authorString = '%'+author.toLowerCase()+'%';
    const values = [authorString];
    const result = await pool.query(query,values);
    return result.rows;
}
const getBooksAvailable = async () =>{
    const query = `
        SELECT b.id,
        b.title as book_title,
        a.name as author,
        g.name as genre,
        b.published_date
        FROM books as b
        INNER JOIN genres as g  
        ON g.id = b.genre_id
        INNER JOIN authors as a
        ON a.id = b.author_id
        WHERE b.is_available = True
        ORDER BY g.name;
    `;
    const result = await pool.query(query);
    return result.rows;
}
const getPopularGenres = async () =>{
    const query = `
        SELECT g.name as genre, COUNT(g.name) as times_borrowed
        FROM borrowing_records as br
        INNER JOIN books as b
        ON br.book_id = b.id
        INNER JOIN genres as g
        ON b.genre_id = g.id
        GROUP BY g.name
        ORDER BY COUNT(g.name) DESC;
    `;
    const result = await pool.query(query);
    return result.rows;
}
const getAuthorsMostBorrowed = async () =>{
    const query = `
        SELECT b.title as book_title,
            a.name as author, 
            g.name as genre,
            COUNT(b.title) as times_borrowed
        FROM borrowing_records as br
        INNER JOIN books as b
        ON br.book_id = b.id
        INNER JOIN authors as a
        ON a.id = b.author_id
        INNER JOIN genres as g
        ON g.id = b.genre_id
        GROUP BY b.title, a.name,g.name
        ORDER BY times_borrowed desc, a.name;
    `;
    const result = await pool.query(query);
    return result.rows;
}
const getBooksByTitle = async (title) =>{
    const query = `
        SELECT b.id, b.title,
        g.name as genre,
        a.name as author,
        b.is_available
        FROM books as b
        INNER JOIN genres as g
        ON g.id = b.genre_id
        INNER JOIN authors as a
        ON a.id = b.author_id
        WHERE LOWER(b.title) LIKE $1
        ORDER BY b.is_available DESC,g.name,b.title;
    `;
    const titleString = '%'+title+'%';
    const values = [titleString];
    const result = await pool.query(query,values);
    return result.rows;
}
const getBooksPublishedLatest = async() =>{
    const query = `
        SELECT b.id, 
            b.title, 
            g.name as genre,
            b.published_date, 
            b.is_available
        FROM books as b
        INNER JOIN genres as g
        ON g.id = b.genre_id
        WHERE b.published_date >= NOW() - INTERVAL '1 YEAR'
        ORDER BY b.published_date DESC;
    `;
    const result = await pool.query(query);
    return result.rows;
}
const getBooksDueSoon = async () =>{
    const query = `
        SELECT b.title, bo."name",bo.email,br.borrowed_date,br.due_date
        FROM borrowing_records as br
        INNER JOIN books as b
        ON b.id = br.book_id
        INNER JOIN borrowers as bo
        ON bo.id = br.borrower_id
        WHERE due_date <= NOW() + INTERVAL '1 MONTH'
        AND returned_date IS NULL
        ORDER BY due_date;
    `;
    const result = await pool.query(query);
    return result.rows;
}
const getBooksBorrowedStats = async () =>{
    const query = `
        SELECT b.id as book_id,
        a.name as author,
        b.title,g.name as genre, 
        COUNT (b.title) as times_borrowed
        FROM borrowing_records as br
        INNER JOIN books as b 
        ON b.id = br.book_id
        INNER JOIN genres as g
        ON g.id = b.genre_id
        INNER JOIN authors as a
        ON a.id = b.author_id
        GROUP BY b.id, b.title,a.name,g.name
        ORDER BY times_borrowed DESC, g.name, b.title;
    `;
    const result = await pool.query(query);
    return result.rows;
}
const getBooksBorrowedBy = async (borrowerId) =>{
    const query = `
        SELECT bo.name as borrower,
        b.title as book_title,
        b.id as book_id,
        br.borrowed_date, br.due_date,br.returned_date
        FROM borrowing_records as br
        INNER JOIN borrowers as bo
        ON bo.id = br.borrower_id
        INNER JOIN books as b
        ON b.id = br.book_id
        WHERE bo.id = $1
        ORDER BY br.due_date DESC, 
        br.borrowed_date, br.returned_date DESC;
    `;
    const values = [borrowerId];
    const result = await pool.query(query,values);
    return result.rows;
}
const getBooksOverdue = async () =>{
    const query = `
        SELECT b.id as book_id, 
            b.title, bo.name, 
            bo.email, br.borrowed_date, 
            br.due_date
        FROM borrowing_records as br
        INNER JOIN borrowers as bo
        ON bo.id = br.borrower_id
        INNER JOIN books as b
        ON b.id = br.book_id
        WHERE due_date < NOW()
        AND br.returned_date IS NULL
        ORDER BY due_date;
    `;
    const result = await pool.query(query);
    return result.rows;
}
const getBorrowingHistory = async () =>{
        const query = `
        SELECT bo.name as borrower,
        b.title as book_title,
        b.id as book_id,
        br.borrowed_date, br.due_date,br.returned_date
        FROM borrowing_records as br
        INNER JOIN borrowers as bo
        ON bo.id = br.borrower_id
        INNER JOIN books as b
        ON b.id = br.book_id
        ORDER BY br.returned_date DESC,
        br.borrowed_date,br.due_date;
    `;
    const result = await pool.query(query);
    return result.rows;
}

module.exports = {
    // genre basic
    getGenresAll,
    getGenresSingle,
    createGenre,
    updateGenre,
    deleteGenre,

    // author basic
    getAuthorsAll,
    getAuthorsSingle,
    createAuthor,
    updateAuthor,
    deleteAuthor,

    // books basic
    getBooksAll,
    getBooksSingle,
    createBook,
    updateBook,
    deleteBook,

    // borrowers basic
    getBorrowersAll,
    getBorrowersSingle,
    createBorrower,
    updateBorrower,
    deleteBorrower,

    // borrowing records basic
    getBRecordsAll,
    getBRecordsSingle,
    createBRecord,
    updateBRecord,
    deleteBRecord,

    getBooksByGenreAll,
    getBooksByGenre,
    getBooksByAuthorAll,
    getBooksByAuthor,
    getBooksAvailable,
    getPopularGenres,
    getAuthorsMostBorrowed,
    getBooksByTitle,
    getBooksPublishedLatest,
    getBooksDueSoon,
    getBooksBorrowedStats,
    getBooksBorrowedBy,
    getBooksOverdue,
    getBorrowingHistory
};