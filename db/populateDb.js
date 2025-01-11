/**
 * Run these queries to create the tables used in the project.
 * 
 * 
 * CREATE TABLE genres (
 * id SERIAL PRIMARY KEY,
 * name VARCHAR(100) UNIQUE NOT NULL,
 * description TEXT
 * );
 * 
 * CREATE TABLE authors (
 * id SERIAL PRIMARY KEY,
 * name VARCHAR(100) UNIQUE NOT NULL,
 * bio TEXT,
 * date_of_birth DATE
 * );
 * 
 * CREATE TABLE books (
 * id SERIAL PRIMARY KEY,
 * title VARCHAR(255) NOT NULL,
 * genre_id INT REFERENCES genres(id) ON DELETE SET NULL,
 * author_id INT REFERENCES authors(id) ON DELETE SET NULL,
 * published_date DATE NOT NULL,
 * is_available BOOLEAN DEFAULT TRUE
 * );
 * 
 * CREATE TABLE borrowers (
 * id SERIAL PRIMARY KEY,
 * name VARCHAR(100) NOT NULL,
 * email VARCHAR(100) UNIQUE NOT NULL
 * );
 * 
 * CREATE TABLE borrowing_records (
 * id SERIAL PRIMARY KEY,
 * book_id INT REFERENCES books(id) ON DELETE CASCADE,
 * borrower_id INT REFERENCES borrowers(id) ON DELETE CASCADE,
 * borrowed_date DATE NOT NULL,
 * due_date DATE NOT NULL,
 * returned_date DATE
 * );
 * 
 * 
 * DB CONSIDERATIONS AND ASSUMPTIONS
 * ---------------------------------
 * is_available defaults to TRUE in the books table to simplify adding new books.
 * Every book has one and only one author.
 * Every book has one and only one genre.
 * When a book is borrowed, it is marked as unavailable until it is returned.
 * If a book or borrower is deleted, all associated borrowing records will also be deleted.
 * If a genre or author is deleted, the corresponding field in the books table will be set to NULL
 * 
 */


