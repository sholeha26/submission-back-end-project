const { nanoid } = require('nanoid');
const books = require('./books');

const addBooks = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertAt;
  const finished = readPage === pageCount;
  const checkReadPage = readPage <= pageCount;
  if (name !== undefined && checkReadPage === true) { 
  const newBook = {
    id, name, year, author, summary, publisher, pageCount, readPage, reading, updateAt, insertAt, finished
  }
  books.push(newBook);
  const isSuccessed = books.filter((book) => book.id === id).length > 0;
  if (isSuccessed) {
    const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
            bookId: id
        }
    })
    response.code(201);
    return response;
  }
  }
  const reponse = h.response({
    status: 'fail',
    message: name === undefined ? 'Gagal memperbarui buku. Mohon isi nama buku' : 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
  })
  response.code(400);
  return response;
  }

const errorHandlerGetBooks = (h) => {
    const response = h.response({
        status: 'error',
        message: 'Buku gagal dilihat',
    });
    response.code(500);
    return response;
}

const getAllBooks = (request, h) => {
    try {
        let allBooks = books.map((book) => ({...book}));
        const {name, reading, finished } = request.query;
        if (name !== undefined && name !== '') {
            allBooks = listBooks.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
        }
        if (reading !== undefined && reading !== '') {
            allBooks = listBooks.filter((books) =>{
                if(reading === 1){
                    return book.reading === reading;
                }
                return book.reading === 0;
            });
        }
        if (finished !== undefined && finished !== '') {
            allBooks = listBooks.filter((books) =>{
                if(finished === 1){
                    return book.finished === finished;
                }
                return book.finished === 0;
            });
        }
        const bookMaps = (book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
        });
        allBooks = listBooks.map(bookMaps);
        const response = h.response({
            status: 'success',
            data: {
                books: allBooks,
            },
        });
        response.code(200);
        return response;
    } catch (error) {
        return errorHandlerGetBooks(h);
    }
};

const getSpecificBooks = (request, h) => {
    const {id} = request.params
    const book = books.filter((item) => item.id === id) [0]
    
    if (book !== undefined) {
        const response = h.response({
            status: 'success',
            data: {
                book
            }
        })
        response.code(200)
        return response
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan'
    })
    response.code(404)
    return resopnse
}

const errorUpdate = (h) => {
    const response = h.response({
        status: 'error',
        message: 'Buku gagal diperbarui',
    });
    response.code(500);
    return response;
};

const updateBooks = (request, h) => {
    try{
        const { id } = request.params;

        const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

        if(!name || name === '' || name === undefined) {
            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. Mohon isi nama buku',
            });
            response.code(400);
            return response;
        }

        if (readPage > pageCount) {
            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
            });
            response.code(400);
            return response;
        }
        const updateAt = new Date().toISOString();
        const index = books.findIndex((book) => book.id === id);
        const finished = readPage === pageCount;

        if (index !== -1) {
            books[index] = {
                ...books[index],
                name,
                year,
                author,
                summary,
                publisher,
                pageCount,
                readPage,
                finished,
                reading,
                updatedAt,
            };
            const response = h.response({
                status: 'success',
                message: 'Buku berhasil diperbarui',
            });
            response.code(200);
            return response;
        }
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        });
        response.code(404);
        return response;
    }
    catch (error){
        return errorUpdate(h);
    }
};

const deleteBooks = (request, h) => {
    const { id } = request.params
    const checkId = books.findIndex((book) => book.id === id)

    if (checkId !== -1) {
        books.splice(checkId, 1)
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus'
        })
        response.code(200)
        return resopnse
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan'
    })
    response.code(404)
    return response
}

module.exports = {
    addBooks,
    getAllBooks,
    getSpecificBooks,
    updateBooks,
    deleteBooks
};