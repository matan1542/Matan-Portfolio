const KEY = 'books';
var gBooks = [];

var gIdOrder = 1;
_createBooks();


function getBooksForDisplay() {
    return gBooks;
}

function getImgsForDisplay() {
    var gPhotos = {
        'Harry Potter': '../img/secondBook.webp',
        'Game of thrones': '../img/fourBook.jpg',
        'Lord of the rings': '../img/firstBook.webp'
    }

    return gPhotos;
}

function addBook(name, price) {
    var book = _createBook(name, '', price)
    gBooks.push(book);
    _saveBooksToStorage();
}


function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id
    })
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage();

}
function findBookByIdx(bookId) {
    var bookUpdateIdx = gBooks.findIndex((book) => book.id === bookId);
    return gBooks[bookUpdateIdx];
}

function updateBook(bookId, price) {
    var book = findBookByIdx(bookId);
    book.price = price;
    _saveBooksToStorage();
}
function changeRate(val, bookId) {
    var book = findBookByIdx(bookId);
    var bookIdx = _findBookIdx(book);
    gBooks[bookIdx].bookRate = val;
    _saveBooksToStorage()
}

function _findBookIdx(foundBook) {
    return gBooks.findIndex((book) => book === foundBook)
}

function _createBooks() {
    var books = loadFromStorage(KEY)
    if (!books || books.length === 0) {
        var books = [
            _createBook('Harry Potter'),
            _createBook('Lord of the rings')
        ];
    }
    gBooks = books;
    _saveBooksToStorage();
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}

function _createBook(name, imgUrl = '', price = getRandomIntInclusive(1, 150), bookRate = 0) {
    return {
        id: makeId(),
        order: gIdOrder++,
        name,
        price,
        imgUrl,
        bookRate
    }
}