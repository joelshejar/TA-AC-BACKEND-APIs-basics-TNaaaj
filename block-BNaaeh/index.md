writeCode

Q1. Create an express applications which handlles endpoints for book-store.

Handle all API endpoints for book resource

1. GET /api/books - list of all books
2. GET /api/books/:id - get single book
3. POST /api/books - create a book
4. PUT /api/books/:id - update a book
5. DELETE /api/books/:id - delete a book

Q2. Implement a second version of above endpoints in same application to add comments for each books listed on book store.

- handle all routes for books i.e. same as above
- implement all routes for handling comments on each book
- implement routes to
  - add comments
  - view all comments for a specific book
  - edit/delete a comment

Above application should have 2 versions of APIs exposed.

1. Endpoints for books
2. Endpoints for books as well as comments
