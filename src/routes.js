const { addBooks, getAllBooks, getSpecificBooks, updateBooks, deleteBooks} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBooks,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getSpecificBooks,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: updateBooks,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBooks,
  },
];

module.exports = routes;
