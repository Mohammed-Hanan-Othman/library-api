## Table of Contents
- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Endpoints](#highlighted-api-endpoints)
  - [Pagination](#pagination)
  - [Filtering](#filtering)
  - [Books](#books)
  - [Authors](#authors)
  - [Borrowing Records](#borrowing-records)
  - [Genres](#genres)
- [Database Schema](#database-schema)


# **Library Management API**


## **Overview**
A RESTful API built for managing library operations, such as managing books, authors, and borrowing records. Designed to handle library data efficiently with support for search, pagination, and filtering. 

## **Technologies Used**
- **Node.js**
- **Express.js**
- **PostgreSQL**

## **Features**
- Manage books, authors, and borrowing records.
- Search for books by title, author, or genre.
- Implement pagination for efficient handling of large datasets.
- Implement relational mappings between entities for efficient data management.
- Support for pagination and filtering for efficient data access.
- Implement filtering to narrow down results based on specific criteria.

---

## **Getting Started**

### **Prerequisites**
Before you begin, ensure you have the following installed:
- **Node.js** (version 18.x or later)
- **PostgreSQL** (version 12.x or later)

### **Installation**
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Mohammed-Hanan-Othman/library-api.git
   cd library-api
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Set up environment variables**:  
   Create a `.env` file in the root of the project and configure it as follows:
   ```env
    DB_HOST=hostname
    DB_USER=username
    DB_NAME=db_name
    DB_PASSWORD=pass
    DB_PORT=db_port
   ```
   You can also specify a `PORT` number in `.env`


4. **Create database and tables**:
   - Create database in PostgreSQL
   - Run the queries in `db/queries.sql` file in PostgreSQL to create the tables.

5. **Start the server**:
   ```bash
   npm run start
   ```

   The server will run on `http://localhost:5000` or on the specified `PORT`.

---

## **Highlighted API Endpoints**

### **Pagination**
Some endpoints in the API support pagination to handle large datasets efficiently. Use query parameters like `page` and `limit` to fetch specific portions of the data.

#### Example
**Request:**
```http
GET /authors?page=1&limit=5
```

##### **Parameters:**
- `page`: The page number to fetch (default: 1).
- `limit`: The number of items per page (default: 20).

##### **Response:**
```json
{
    "message": "Success",
	"metadata": {
		"current_page": 1,
		"per_page": 5,
		"total_items": 42,
		"total_pages": 1,
		"has_next_page": true,
		"has_previous_page": false
	},
	"data": [
		{
			"id": 4,
			"name": "Author 1",
			"bio": "Bio 1",
			// ... more fields
		},
        // ... more authors
    ]
}
```

### **Filtering**
Some endpoints support filtering to allow users to narrow down results based on specific criteria. Filtering is achieved by adding query parameters to the request URL.

#### Example
**Request:**
```http
GET books/by-title?title=unto
```
##### **Parameters:**
- `title`: Title (or partial title) to base search on.

**Response**
```json
{
    "message": "Success",
	"data": [
		{
			"id": 3,
			"title": "Life Untold",
			"genre": "Biography",
			"author": "Author 1",
			"is_available": true,
            // ... more fields
		},
        // ... more books
	]
}
```

---

### **Books**
- **GET** `/books`: Retrieve all books. (supports pagination)
- **GET** `/books/:id`: Retrieve a single product by ID.
- **POST** `/books`: Add a new product.

  **Request Body**:
  ```json
  {
    "title" : "Book title",
    "genre_id": 8,
    "author_id": 4,
    "published_date" : "date published",
    "is_available":true
  }
  ```
  **Response:**
  ```json
  {
	"message": "Book created",
	"data": [
		{
			"id": 4,
			"title": "Book title",
			"genre_id": 8,
			"author_id": 4,
			"published_date": "date published",
			"is_available": true
		}
	]
  }
  ```

- **PUT** `/books/:id`: Update an existing book.
- **DELETE** `/books/:id`: Delete a book.
- **GET** `/books/authors?author=agyei`: Retrieve books written by a specific author.
- **GET** `/books/genres?genre=ho`: Retrieve books based on genres.
- **GET** `/books/borrowed-stats`: Retrieve books and number of times they have been borrowed.


### **Authors**
- **GET** `/authors`: Retrieve all authors. (supports pagination)
- **GET** `/authors/:id`: Retrieve a single author by ID.
- **POST** `/authors`: Add a new author record.  
  **Request Body**:
  ```json
  {
    "name": "Author name",
    "bio": "Author's bio",
    "dateOfBirth": "date of birth"
  }
  ```
  **Response**
  ```json
    {
        "message": "Author created",
        "data": [
            {
                "id": 4,
                "name": "Author name",
                "bio": "Author's bio",
                "date_of_birth": "date of birth"
            }
        ]
    }
  ```
- **GET** `/authors/most-borrowed`: Retrieve authors whose books are borrowed the most.

### **Borrowing Records**
- **GET** `/brecords`: Retrieve all borrowing records.
- **GET** `/brecords/:id`: Retrieve a single borrowing record by ID.
- **POST** `/brecords`: Add a borrowing record (i.e. borrow a book).  
  **Request Body**:
  ```json
  {
    "bookId": 2,
    "borrowerId":6,
    "borrowedDate":"date borrowed",
    "dueDate":"date due"
  }
  ```
  **Response**
  ```json
    {
        "message": "Borrowing successful",
        "data": [
            {
                "id": 4,
                "book_id": 2,
                "borrower_id": 6,
                "borrowed_date": "date borrowed",
                "due_date": "date due",
                "returned_date": null
            }
        ]
    }
  ```
- **PUT** `/brecords/:id`: Update an already existing borrowing record. (can also be used for when a borrowed book is returned)  
**Request Body**:
  ```json
  {
    "bookId": 3,
    "borrowerId": 3,
    "borrowedDate": "date borrowed",
    "dueDate": "date due",
    "returnedDate": "date returned",
  }
  ```
  **Response**:
  ```json
  {
    "message": "Borrowing record updated",
	"data": [
		{
			"id": 2,
			"book_id": 3,
			"borrower_id": 3,
			"borrowed_date": "date borrowed",
			"due_date": "date due",
			"returned_date": "date returned",
		}
	]
  }
  ```
- **DELETE** `/brecords/:id`: Delete a specific borrowing record.
- **GET** `/brecords/overdue`: Retrieve all books not yet returned past the due date.
- **GET** `/brecords/due-soon`: Retrieve all books due to be returned soon.

### **Genres**
- **GET** `/genres`: Retrieve all genres.
- **GET** `/genres/popular`: Retrieve popular genres, based on number of times borrowed.
- **POST** `/genres`: Add a new genre.  
  **Request Body**:
  ```json
  {
    "name": "Genre Name",
    "description": "genre description",
  }
  ```
  **Response**:
  ```json
  {
    "message": "Genre created",
	"data": [
		{
			"id": 11,
			"name": "Genre Name",
			"description": "genre description"
		}
	]
  }
  ```
- **DELETE** `/genres/:id`: Delete a single genre (and all relateed books).
---

## **Database Schema**
Database schema information accessible from the `db/populateDb.sql` file.
